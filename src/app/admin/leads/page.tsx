'use client';

import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, MapPin, DollarSign, BookOpen, RefreshCw } from 'lucide-react';

interface Lead {
  id: string;
  countries: string[];
  fieldOfStudy: string;
  programOfStudy: string;
  budget: number;
  name: string;
  phone: string;
  email: string;
  lookingFor: string;
  createdAt: string;
  sessionId: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();
      setLeads(data.sort((a: Lead, b: Lead) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    setDeleteId(id);
    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLeads(leads.filter((lead) => lead.id !== id));
      } else {
        alert('Failed to delete lead');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead');
    } finally {
      setDeleteId(null);
    }
  };

  const formatBudget = (value: number) => {
    const lakhs = value / 100000;
    if (lakhs >= 100) {
      return `₹${(lakhs / 100).toFixed(1)} Cr`;
    }
    return `₹${lakhs.toFixed(0)} L`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads</h1>
          <p className="text-gray-600">Total: {leads.length} leads</p>
        </div>
        <button
          onClick={fetchLeads}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-600">No leads yet. They will appear here once users complete the onboarding form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{lead.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(lead.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(lead.id)}
                  disabled={deleteId === lead.id}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete lead"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {lead.email || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{lead.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Countries</p>
                    <p className="text-sm font-medium text-gray-900">
                      {lead.countries.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Field of Study</p>
                    <p className="text-sm font-medium text-gray-900">
                      {lead.fieldOfStudy}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Program</p>
                    <p className="text-sm font-medium text-gray-900">
                      {lead.programOfStudy}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Budget</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatBudget(lead.budget)}
                    </p>
                  </div>
                </div>
              </div>

              {lead.lookingFor && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500 mb-1">Looking for</p>
                  <p className="text-sm text-gray-900 capitalize">{lead.lookingFor}</p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">Session ID: {lead.sessionId}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
