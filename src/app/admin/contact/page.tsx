'use client';

import { useState, useEffect } from 'react';
import AdminProvider from '../AdminProvider';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let mounted = true;
    // fetch real contacts from API
    (async () => {
      try {
        const res = await fetch('/api/contacts');
        if (!res.ok) throw new Error('Failed to fetch contacts');
        const data = await res.json();
        if (!mounted) return;
        // map server objects to UI Contact shape
        const mapped = (data || []).map((c: any) => ({
          id: c._id,
          name: c.name,
          email: c.email,
          phone: c.phone,
          subject: c.projectType || 'Contact',
          message: c.message,
          date: c.createdAt ? new Date(c.createdAt).toISOString().slice(0, 10) : '',
          status: c.status || 'new',
        }));
        setContacts(mapped);
      } catch (err) {
        // keep empty list on error
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false };
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = filter === 'all' || contact.status === filter;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: 'read' as const } : contact
    ));
  };

  const markAsReplied = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: 'replied' as const } : contact
    ));
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
        <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and respond to customer inquiries and contact form submissions.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 sm:flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-8 sm:pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {(['all', 'new', 'read', 'replied'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full capitalize ${
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

      {/* Contacts List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-3 py-4 sm:px-4 sm:py-5 lg:p-6">
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <li key={contact.id} className="py-3 sm:py-4">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {contact.name}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">
                            {contact.email}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                            {contact.date}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {contact.subject}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 break-words">
                          {contact.message}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="text-xs sm:text-sm text-blue-600 hover:text-blue-500"
                        >
                          View Details
                        </button>
                        {contact.status === 'new' && (
                          <button
                            onClick={() => markAsRead(contact.id)}
                            className="text-xs sm:text-sm text-yellow-600 hover:text-yellow-500"
                          >
                            Mark as Read
                          </button>
                        )}
                        {contact.status !== 'replied' && (
                          <button
                            onClick={() => markAsReplied(contact.id)}
                            className="text-xs sm:text-sm text-green-600 hover:text-green-500"
                          >
                            Mark as Replied
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-3 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedContact(null)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mx-2 sm:mx-0">
              <div className="bg-white px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 lg:p-6 lg:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900 mb-3 sm:mb-4">
                      Contact Details
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900 break-words">{selectedContact.name}</p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900 break-words">{selectedContact.email}</p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Phone</label>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900 break-words">{selectedContact.phone}</p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Subject</label>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900 break-words">{selectedContact.subject}</p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Message</label>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900 break-words">{selectedContact.message}</p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Date</label>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900">{selectedContact.date}</p>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Status</label>
                        <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                          {selectedContact.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-3 py-3 sm:px-4 sm:py-3 lg:px-6 lg:flex lg:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-2 sm:px-4 bg-blue-600 text-sm sm:text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:ml-3 lg:w-auto"
                  onClick={() => setSelectedContact(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <AdminProvider>
      <ContactManagement />
    </AdminProvider>
  );
}
