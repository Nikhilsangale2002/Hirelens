'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Search, Filter, Star, Download, Mail, Phone, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CandidatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+91 9876543210',
      location: 'Bangalore',
      jobTitle: 'Senior Full Stack Developer',
      score: 95,
      status: 'New',
      appliedDate: '2024-12-28',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '+91 9876543211',
      location: 'Remote',
      jobTitle: 'Product Manager',
      score: 92,
      status: 'Shortlisted',
      appliedDate: '2024-12-27',
      skills: ['Product Strategy', 'Agile', 'Data Analysis']
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+91 9876543212',
      location: 'Mumbai',
      jobTitle: 'UI/UX Designer',
      score: 88,
      status: 'Shortlisted',
      appliedDate: '2024-12-26',
      skills: ['Figma', 'User Research', 'Prototyping']
    }
  ];

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getScoreColor = (score) => {
    if (score >= 90) return '#06A77D';
    if (score >= 75) return '#F77F00';
    return '#FF6B35';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Candidates</h1>
          <p className="text-gray-400">View and manage candidates across all jobs</p>
        </div>

        {/* Filters */}
        <div className="glass-panel rounded-2xl p-4 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="glass-panel rounded-2xl p-6 hover-lift">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-full flex items-center justify-center text-xl font-bold">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{candidate.name}</h3>
                      <p className="text-sm text-gray-400">{candidate.jobTitle}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      candidate.status === 'Shortlisted' ? 'bg-[#06A77D]/20 text-[#06A77D]' :
                      candidate.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {candidate.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{candidate.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white/5 rounded-lg text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-4">
                  <div className="text-center">
                    <div
                      className="text-4xl font-bold"
                      style={{ color: getScoreColor(candidate.score) }}
                    >
                      {candidate.score}
                    </div>
                    <div className="text-xs text-gray-400">AI Score</div>
                  </div>
                  <button className="px-4 py-2 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg text-sm font-medium transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
