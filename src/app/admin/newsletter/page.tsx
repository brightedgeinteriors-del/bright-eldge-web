'use client';

import { useState, useEffect } from 'react';
import AdminProvider from '../AdminProvider';

interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  source: string;
}

interface NewsletterCampaign {
  id: string;
  subject: string;
  content: string;
  sentAt?: string;
  recipients: number;
  openRate: number;
  clickRate: number;
}

function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns' | 'compose'>('subscribers');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');

  // Compose form state
  const [composeForm, setComposeForm] = useState({
    subject: '',
    content: '',
    recipients: 'all'
  });

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        // Fetch subscribers
        const subsRes = await fetch('/api/newsletter/subscribers');
        if (!subsRes.ok) throw new Error('Failed to fetch subscribers');
        const subsData = await subsRes.json();
        
        // Fetch campaigns
        const campaignsRes = await fetch('/api/newsletter/campaigns');
        if (!campaignsRes.ok) throw new Error('Failed to fetch campaigns');
        const campaignsData = await campaignsRes.json();
        
        if (!mounted) return;

        // Map subscribers to UI format
        setSubscribers((subsData || []).map((s: any) => ({
          id: s._id,
          email: s.email,
          name: s.name || undefined,
          subscribedAt: new Date(s.createdAt).toISOString().split('T')[0],
          status: s.status,
          source: s.source
        })));

        // Map campaigns to UI format
        setCampaigns((campaignsData || []).map((c: any) => ({
          id: c._id,
          subject: c.subject,
          content: c.content,
          sentAt: c.sentAt ? new Date(c.sentAt).toISOString().split('T')[0] : undefined,
          recipients: c.recipients,
          openRate: c.openRate,
          clickRate: c.clickRate
        })));

      } catch (err) {
        console.error('Error fetching newsletter data:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false };
  }, []);

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesFilter = filter === 'all' || subscriber.status === filter;
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (subscriber.name && subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const toggleSubscription = async (id: string) => {
    const subscriber = subscribers.find(s => s.id === id);
    if (!subscriber) return;

    try {
      const newStatus = subscriber.status === 'active' ? 'unsubscribed' : 'active';
      const res = await fetch('/api/newsletter/subscribers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscriber.email, status: newStatus })
      });

      if (!res.ok) throw new Error('Failed to update subscription');

      // Update local state
      setSubscribers(subscribers.map(s => 
        s.id === id 
          ? { ...s, status: newStatus }
          : s
      ));
    } catch (err) {
      console.error('Error updating subscription:', err);
      // TODO: Show error message to user
    }
  };

  const handleComposeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/newsletter/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(composeForm)
      });

      if (!res.ok) throw new Error('Failed to create campaign');
      const data = await res.json();

      // Add new campaign to list
      setCampaigns(prev => [{
        id: data.campaign._id,
        subject: data.campaign.subject,
        content: data.campaign.content,
        sentAt: data.campaign.sentAt ? new Date(data.campaign.sentAt).toISOString().split('T')[0] : undefined,
        recipients: 0,
        openRate: 0,
        clickRate: 0
      }, ...prev]);

      // Reset form
      setComposeForm({ subject: '', content: '', recipients: 'all' });
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err);
      alert('Failed to create campaign. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your newsletter subscribers and create email campaigns.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto">
          {[
            { id: 'subscribers', name: 'Subscribers', count: subscribers.length },
            { id: 'campaigns', name: 'Campaigns', count: campaigns.length },
            { id: 'compose', name: 'Compose' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count !== undefined && (
                <span className="ml-1 sm:ml-2 bg-gray-100 text-gray-900 py-0.5 px-1.5 sm:px-2.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search subscribers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {(['all', 'active', 'unsubscribed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
                      filter === status
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subscribers List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {filteredSubscribers.map((subscriber) => (
                    <li key={subscriber.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {subscriber.name ? subscriber.name.split(' ').map(n => n[0]).join('') : subscriber.email[0].toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {subscriber.name || 'No name provided'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {subscriber.email}
                            </p>
                            <p className="text-xs text-gray-400">
                              Subscribed on {subscriber.subscribedAt} • {subscriber.source}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscriber.status)}`}>
                            {subscriber.status}
                          </span>
                          <button
                            onClick={() => toggleSubscription(subscriber.id)}
                            className={`text-sm font-medium ${
                              subscriber.status === 'active' 
                                ? 'text-red-600 hover:text-red-500' 
                                : 'text-green-600 hover:text-green-500'
                            }`}
                          >
                            {subscriber.status === 'active' ? 'Unsubscribe' : 'Resubscribe'}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <li key={campaign.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {campaign.subject}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Sent on {campaign.sentAt}
                        </p>
                        <div className="mt-2 flex space-x-6 text-sm text-gray-500">
                          <span>{campaign.recipients} recipients</span>
                          <span>{campaign.openRate}% open rate</span>
                          <span>{campaign.clickRate}% click rate</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-500">
                          View
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-500">
                          Duplicate
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleComposeSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={composeForm.subject}
                  onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter email subject"
                  required
                />
              </div>

              <div>
                <label htmlFor="recipients" className="block text-sm font-medium text-gray-700">
                  Recipients
                </label>
                <select
                  id="recipients"
                  value={composeForm.recipients}
                  onChange={(e) => setComposeForm({ ...composeForm, recipients: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="all">All subscribers ({subscribers.filter(s => s.status === 'active').length})</option>
                  <option value="new">New subscribers (last 30 days)</option>
                </select>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  rows={10}
                  value={composeForm.content}
                  onChange={(e) => setComposeForm({ ...composeForm, content: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Write your newsletter content here..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Newsletter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NewsletterPage() {
  return (
    <AdminProvider>
      <NewsletterManagement />
    </AdminProvider>
  );
}
