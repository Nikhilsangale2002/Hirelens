'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Download, Mail, Phone, MapPin, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { candidatesApi } from '@/lib/api';

export default function CandidatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCandidates();
  }, [statusFilter]);

  const loadCandidates = async () => {
    try {
      setIsLoading(true);
      setError('');
      const status = statusFilter === 'all' ? null : statusFilter;
      const data = await candidatesApi.getAllCandidates(status, searchQuery);
      setCandidates(data.candidates || []);
    } catch (err) {
      setError(err.message || 'Failed to load candidates');
      if (process.env.NODE_ENV === 'development') {
        console.error('Load candidates error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadCandidates();
  };

  const handleDeleteCandidate = async (candidateId, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this candidate?')) {
      return;
    }

    try {
      await candidatesApi.deleteCandidate(candidateId);
      setCandidates(candidates.filter(c => c.id !== candidateId));
    } catch (err) {
      alert(err.message || 'Failed to delete candidate');
    }
  };

  const filteredCandidates = candidates.filter(c => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (c.candidate_name || '').toLowerCase().includes(search) ||
           (c.email || '').toLowerCase().includes(search) ||
           (c.job_title || '').toLowerCase().includes(search);
  });

  const getScoreColor = (score) => {
    if (score >= 90) return '#06A77D';
    if (score >= 75) return '#F77F00';
    return '#FF6B35';
  };

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Candidates</h1>
          <p className="text-gray-400">View and manage candidates across all jobs</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass-panel rounded-2xl p-4 bg-red-500/10 border border-red-500/50">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Filters */}
        <form onSubmit={handleSearch} className="glass-panel rounded-2xl p-4 flex gap-4">
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
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black [&>option]:bg-white"
          >
            <option value="all" className="text-black bg-white">All Status</option>
            <option value="new" className="text-black bg-white">New</option>
            <option value="shortlisted" className="text-black bg-white">Shortlisted</option>
            <option value="rejected" className="text-black bg-white">Rejected</option>
            <option value="hired" className="text-black bg-white">Hired</option>
          </select>
          <button
            type="submit"
            className="px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-medium transition-all"
          >
            Search
          </button>
        </form>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel rounded-2xl p-6">
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-white/10 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Candidates List */}
            <div className="space-y-4">{filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="glass-panel rounded-2xl p-6 hover-lift">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-full flex items-center justify-center text-xl font-bold">
                      {(candidate.candidate_name || 'U').charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{candidate.candidate_name || 'Unknown'}</h3>
                      <p className="text-sm text-gray-400">{candidate.job_title || 'No job title'}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      candidate.status === 'shortlisted' ? 'bg-[#06A77D]/20 text-[#06A77D]' :
                      candidate.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      candidate.status === 'hired' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {candidate.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span>{candidate.email || 'No email'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{candidate.phone || 'No phone'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{candidate.location || 'No location'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(candidate.matched_skills || []).slice(0, 5).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white/5 rounded-lg text-xs">
                        {skill}
                      </span>
                    ))}
                    {(candidate.matched_skills || []).length > 5 && (
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                        +{candidate.matched_skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-4">
                  <div className="text-center">
                    <div
                      className="text-4xl font-bold"
                      style={{ color: getScoreColor(candidate.ai_score || 0) }}
                    >
                      {Math.round(candidate.ai_score || 0)}
                    </div>
                    <div className="text-xs text-gray-400">AI Score</div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => router.push(`/dashboard/candidates/${candidate.id}`)}
                      className="px-4 py-2 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg text-sm font-medium transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => handleDeleteCandidate(candidate.id, e)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && !isLoading && (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
            <p className="text-gray-400">
              {searchQuery 
                ? 'Try adjusting your search or filters' 
                : 'No candidates have applied yet'}
            </p>
          </div>
        )}
          </>
        )}
      </div>

  );
}
