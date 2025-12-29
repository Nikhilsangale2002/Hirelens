'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
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

export default function JobsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      candidates: 145,
      shortlisted: 12,
      rejected: 98,
      status: 'Active',
      createdAt: '2024-12-28',
      requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore',
      type: 'Full-time',
      candidates: 89,
      shortlisted: 8,
      rejected: 45,
      status: 'Active',
      createdAt: '2024-12-25',
      requiredSkills: ['Product Strategy', 'Agile', 'Data Analysis']
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Mumbai',
      type: 'Full-time',
      candidates: 67,
      shortlisted: 15,
      rejected: 32,
      status: 'Active',
      createdAt: '2024-12-23',
      requiredSkills: ['Figma', 'User Research', 'Prototyping']
    },
    {
      id: 4,
      title: 'Data Scientist',
      department: 'Data',
      location: 'Remote',
      type: 'Full-time',
      candidates: 56,
      shortlisted: 6,
      rejected: 28,
      status: 'Closed',
      createdAt: '2024-12-20',
      requiredSkills: ['Python', 'Machine Learning', 'SQL']
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Hyderabad',
      type: 'Full-time',
      candidates: 78,
      shortlisted: 10,
      rejected: 45,
      status: 'Active',
      createdAt: '2024-12-18',
      requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD']
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Jobs</h1>
            <p className="text-gray-400">Manage all your job postings and candidates</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/jobs/create')}
            className="flex items-center space-x-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all shadow-lg shadow-[#FF6B35]/20"
          >
            <Plus className="w-5 h-5" />
            <span>Create Job</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="glass-panel rounded-2xl p-6">
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
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="glass-panel rounded-2xl p-6 hover-lift cursor-pointer"
              onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === 'Active' 
                        ? 'bg-[#06A77D]/20 text-[#06A77D]' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>Created {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/5 rounded-lg text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.requiredSkills.length > 4 && (
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                        +{job.requiredSkills.length - 4} more
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
                    <div className="text-sm font-semibold">{job.candidates}</div>
                    <div className="text-xs text-gray-400">Candidates</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-[#06A77D]/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#06A77D]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{job.shortlisted}</div>
                    <div className="text-xs text-gray-400">Shortlisted</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{job.rejected}</div>
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
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => router.push('/dashboard/jobs/create')}
              className="px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all"
            >
              Create Your First Job
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
