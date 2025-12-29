'use client';

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  TrendingUp, 
  Briefcase, 
  Users, 
  Clock, 
  ArrowRight,
  Plus,
  BarChart3,
  Target
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const stats = [
    {
      label: 'Active Jobs',
      value: '7',
      change: '+2 this week',
      icon: <Briefcase className="w-6 h-6" />,
      color: '#FF6B35'
    },
    {
      label: 'Total Candidates',
      value: '1,234',
      change: '+156 this month',
      icon: <Users className="w-6 h-6" />,
      color: '#004E89'
    },
    {
      label: 'Shortlisted',
      value: '89',
      change: '7.2% rate',
      icon: <Target className="w-6 h-6" />,
      color: '#06A77D'
    },
    {
      label: 'Avg. Processing Time',
      value: '2.3s',
      change: '70% faster',
      icon: <Clock className="w-6 h-6" />,
      color: '#F77F00'
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      candidates: 145,
      shortlisted: 12,
      status: 'Active',
      createdAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      candidates: 89,
      shortlisted: 8,
      status: 'Active',
      createdAt: '5 days ago'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      candidates: 67,
      shortlisted: 15,
      status: 'Active',
      createdAt: '1 week ago'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="gradient-text">HR Manager</span>
            </h1>
            <p className="text-gray-400">Here's what's happening with your recruitment today.</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/jobs/create')}
            className="flex items-center space-x-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all shadow-lg shadow-[#FF6B35]/20"
          >
            <Plus className="w-5 h-5" />
            <span>Create Job</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-panel rounded-2xl p-6 hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}33, ${stat.color}11)`,
                    color: stat.color
                  }}
                >
                  {stat.icon}
                </div>
                <div className="text-xs text-gray-400">{stat.change}</div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Jobs */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Jobs</h2>
            <button
              onClick={() => router.push('/dashboard/jobs')}
              className="flex items-center space-x-2 text-[#FF6B35] hover:text-[#F77F00] transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer border border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{job.department} • {job.createdAt}</p>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{job.candidates} candidates</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-[#06A77D]" />
                        <span className="text-[#06A77D]">{job.shortlisted} shortlisted</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className="px-3 py-1 bg-[#06A77D]/20 text-[#06A77D] rounded-full text-xs font-medium">
                      {job.status}
                    </span>
                    <button className="text-[#FF6B35] hover:text-[#F77F00] text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboard/jobs/create')}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#FF6B35]/20 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <span className="font-medium">Create New Job</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => router.push('/dashboard/jobs')}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#004E89]/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-[#004E89]" />
                  </div>
                  <span className="font-medium">Upload Resumes</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => router.push('/dashboard/candidates')}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#06A77D]/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#06A77D]" />
                  </div>
                  <span className="font-medium">Review Candidates</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Resume processed', detail: 'John Doe - Full Stack Developer', time: '5 min ago', color: '#FF6B35' },
                { action: 'Candidate shortlisted', detail: 'Sarah Wilson - Product Manager', time: '1 hour ago', color: '#06A77D' },
                { action: 'Job created', detail: 'Senior UI/UX Designer', time: '2 hours ago', color: '#004E89' },
                { action: 'Resume processed', detail: 'Mike Chen - Backend Developer', time: '3 hours ago', color: '#FF6B35' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: activity.color }}
                  ></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-gray-400">{activity.detail}</div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
