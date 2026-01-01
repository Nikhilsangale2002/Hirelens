'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  Users, 
  Target,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { jobsApi } from '@/lib/api';

export default function JobsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobs();
  }, [filterStatus]);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError('');
      const status = filterStatus === 'all' ? null : filterStatus;
      const data = await jobsApi.getJobs(status);
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message || 'Failed to load jobs');
      if (process.env.NODE_ENV === 'development') {
        console.error('Load jobs error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (jobId, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await jobsApi.deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      alert(err.message || 'Failed to delete job');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Jobs</h1>
            <p className="text-sm md:text-base text-gray-400">Manage all your job postings and candidates</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/jobs/create')}
            className="flex items-center justify-center space-x-2 px-4 md:px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all shadow-lg shadow-[#FF6B35]/20 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Create Job</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass-panel rounded-2xl p-4 bg-red-500/10 border border-red-500/50">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Filters & Search */}
        <div className="glass-panel rounded-2xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black [&>option]:bg-white"
            >
              <option value="all" className="text-black bg-white">All Status</option>
              <option value="active" className="text-black bg-white">Active</option>
              <option value="closed" className="text-black bg-white">Closed</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel rounded-2xl p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-white/10 rounded w-1/3"></div>
                  <div className="h-4 bg-white/10 rounded w-2/3"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/10 rounded w-20"></div>
                    <div className="h-6 bg-white/10 rounded w-20"></div>
                    <div className="h-6 bg-white/10 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Jobs List */}
            <div className="space-y-4">{filteredJobs.map((job) => (
            <div
              key={job.id}
              className="glass-panel rounded-2xl p-4 md:p-6 hover-lift cursor-pointer"
              onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-3 mb-2">
                    <h3 className="text-lg md:text-xl font-bold">{job.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                      job.status === 'active' 
                        ? 'bg-[#06A77D]/20 text-[#06A77D]' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-3">
                    <span>{job.department}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{job.location}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{job.job_type || job.type}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-xs">Created {formatDate(job.created_at || job.createdAt)}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(job.skills_required || job.requiredSkills || []).slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/5 rounded-lg text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {(job.skills_required || job.requiredSkills || []).length > 4 && (
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                        +{(job.skills_required || job.requiredSkills).length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-[#004E89]/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#004E89]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{job.candidates_count || job.candidates || 0}</div>
                    <div className="text-xs text-gray-400">Candidates</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-[#06A77D]/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#06A77D]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{job.shortlisted_count || job.shortlisted || 0}</div>
                    <div className="text-xs text-gray-400">Shortlisted</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{job.rejected || 0}</div>
                    <div className="text-xs text-gray-400">Rejected</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/jobs/${job.id}`);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View Candidates</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/jobs/${job.id}/edit`);
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDeleteJob(job.id, e)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && !isLoading && (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? 'Try adjusting your search or filters' 
                : 'Get started by creating your first job posting'}
            </p>
            <button
              onClick={() => router.push('/dashboard/jobs/create')}
              className="px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all"
            >
              Create Your First Job
            </button>
          </div>
        )}
          </>
        )}
      </div>
  );
}
