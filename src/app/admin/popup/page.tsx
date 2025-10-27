"use client";

import React, { useEffect, useState } from 'react';

interface PopupItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message?: string;
  createdAt?: string;
}

export default function AdminPopupPage() {
  const [items, setItems] = useState<PopupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<PopupItem | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchItems() {
      try {
        const res = await fetch('/api/popup');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (mounted) {
          setItems(data || []);
        }
      } catch (err: any) {
        console.error('Error fetching popups:', err);
        setError(err?.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchItems();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Popup Submissions</h1>
          <p className="text-sm text-gray-500">Submissions from the Get Free Quote popup.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
            </div>
          ) : error ? (
            <div className="p-4 text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="p-4 text-gray-600">No popup submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {items.map((it) => (
                    <tr key={it._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{it.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{it.email}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{it.createdAt ? new Date(it.createdAt).toLocaleString() : '-'}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedItem(it)}
                          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-lg">{selectedItem.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg">{selectedItem.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-lg">{selectedItem.phone || 'Not provided'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Project Type</h3>
                <p className="mt-1 text-lg">{selectedItem.projectType || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <p className="mt-1 text-lg whitespace-pre-wrap">{selectedItem.message || 'No message'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Submitted On</h3>
                <p className="mt-1 text-lg">
                  {selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : 'Date not available'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
