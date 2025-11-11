'use client';

import { useEffect, useState } from 'react';
import { Users, MessageSquare, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalLeads: number;
  totalConversations: number;
  totalKnowledgeSources: number;
  recentLeads: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    totalConversations: 0,
    totalKnowledgeSources: 0,
    recentLeads: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [leadsRes, conversationsRes, knowledgeRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/conversations'),
        fetch('/api/admin/knowledge'),
      ]);

      const leads = await leadsRes.json();
      const conversations = await conversationsRes.json();
      const knowledge = await knowledgeRes.json();

      // Calculate recent leads (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentLeads = leads.filter(
        (lead: { createdAt: string }) => new Date(lead.createdAt) > sevenDaysAgo
      ).length;

      setStats({
        totalLeads: leads.length,
        totalConversations: conversations.length,
        totalKnowledgeSources: knowledge.length,
        recentLeads,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/leads',
      subtext: `${stats.recentLeads} new this week`,
    },
    {
      title: 'Conversations',
      value: stats.totalConversations,
      icon: MessageSquare,
      color: 'bg-green-500',
      link: '/admin/conversations',
    },
    {
      title: 'Knowledge Sources',
      value: stats.totalKnowledgeSources,
      icon: BookOpen,
      color: 'bg-purple-500',
      link: '/admin/knowledge',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to Prime Edutech Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
            {card.subtext && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {card.subtext}
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/leads"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">View All Leads</h3>
            <p className="text-sm text-gray-600">Manage and export lead data</p>
          </Link>
          <Link
            href="/admin/conversations"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">View Conversations</h3>
            <p className="text-sm text-gray-600">Review AI counsellor chats</p>
          </Link>
          <Link
            href="/admin/knowledge"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Manage Knowledge Base</h3>
            <p className="text-sm text-gray-600">Add, edit, or delete documents</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
