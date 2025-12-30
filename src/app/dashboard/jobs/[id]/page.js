'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Users,
  Target,
  TrendingUp,
  Download,
  Filter,
  Search,
  Star,
  X as XIcon,
  FileText,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JobDetail({ params }) {
  const router = useRouter();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Mock job data
  const job = {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    niceToHaveSkills: ['TypeScript', 'GraphQL', 'Redis']
  };

  // Mock candidates data
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+91 9876543210',
      location: 'Bangalore',
      experience: '5 years',
      education: 'B.Tech Computer Science',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript'],
      score: 95,
      matchedSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      missingSkills: ['Docker'],
      status: 'New',
      appliedDate: '2024-12-28'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '+91 9876543211',
      location: 'Remote',
      experience: '6 years',
      education: 'M.Tech Software Engineering',
      skills: ['React', 'Node.js', 'Docker', 'AWS', 'GraphQL'],
      score: 92,
      matchedSkills: ['React', 'Node.js', 'Docker', 'AWS'],
      missingSkills: ['PostgreSQL'],
      status: 'Shortlisted',
      appliedDate: '2024-12-27'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+91 9876543212',
      location: 'Mumbai',
      experience: '4 years',
      education: 'B.E. Information Technology',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      score: 78,
      matchedSkills: ['React', 'Node.js', 'AWS'],
      missingSkills: ['PostgreSQL', 'Docker'],
      status: 'New',
      appliedDate: '2024-12-26'
    }
  ]);

  const getScoreColor = (score) => {
    if (score >= 90) return '#06A77D';
    if (score >= 75) return '#F77F00';
    return '#FF6B35';
  };

  const updateCandidateStatus = (candidateId, newStatus) => {
    setCandidates(candidates.map(c => 
      c.id === candidateId ? { ...c, status: newStatus } : c
    ));
  };

  const filteredCandidates = candidates
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => b.score - a.score);

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors mt-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <span>{job.department}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all shadow-lg shadow-[#FF6B35]/20"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Resumes</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Candidates', value: candidates.length, icon: <Users className="w-5 h-5" />, color: '#004E89' },
            { label: 'Shortlisted', value: candidates.filter(c => c.status === 'Shortlisted').length, icon: <Target className="w-5 h-5" />, color: '#06A77D' },
            { label: 'Rejected', value: candidates.filter(c => c.status === 'Rejected').length, icon: <XCircle className="w-5 h-5" />, color: '#FF6B35' },
            { label: 'Avg Score', value: Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length), icon: <Star className="w-5 h-5" />, color: '#F77F00' }
          ].map((stat, index) => (
            <div key={index} className="glass-panel rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${stat.color}22`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
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
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="glass-panel rounded-2xl p-6 hover-lift cursor-pointer"
              onClick={() => setSelectedCandidate(candidate)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{candidate.name}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{candidate.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Score */}
                <div className="text-center">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: getScoreColor(candidate.score) }}
                  >
                    {candidate.score}
                  </div>
                  <div className="text-xs text-gray-400">AI Score</div>
                </div>
              </div>

              {/* Skills Match */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Skills Match</span>
                  <span className="text-sm font-medium">
                    {candidate.matchedSkills.length}/{job.requiredSkills.length}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#06A77D] to-[#004E89]"
                    style={{ width: `${(candidate.matchedSkills.length / job.requiredSkills.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Matched Skills */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">Matched Skills:</div>
                <div className="flex flex-wrap gap-1">
                  {candidate.matchedSkills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#06A77D]/20 text-[#06A77D] rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.matchedSkills.length > 3 && (
                    <span className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs">
                      +{candidate.matchedSkills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center space-x-2 pt-4 border-t border-white/10">
                <select
                  value={candidate.status}
                  onChange={(e) => {
                    e.stopPropagation();
                    updateCandidateStatus(candidate.id, e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    candidate.status === 'Shortlisted' ? 'bg-[#06A77D]/20 text-[#06A77D] border-[#06A77D]/50' :
                    candidate.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border-red-500/50' :
                    'bg-blue-500/20 text-blue-400 border-blue-500/50'
                  } border`}
                >
                  <option value="New">New</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCandidate(candidate);
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Candidate Detail Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
            <div className="glass-panel rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#0F1433] p-6 border-b border-white/10 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCandidate.name}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{selectedCandidate.email}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{selectedCandidate.phone}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* AI Score */}
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div
                    className="text-6xl font-bold mb-2"
                    style={{ color: getScoreColor(selectedCandidate.score) }}
                  >
                    {selectedCandidate.score}
                  </div>
                  <div className="text-gray-400">AI Match Score</div>
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-400">Experience</span>
                    </div>
                    <div className="font-medium">{selectedCandidate.experience}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-400">Education</span>
                    </div>
                    <div className="font-medium">{selectedCandidate.education}</div>
                  </div>
                </div>

                {/* Skills Analysis */}
                <div>
                  <h3 className="font-semibold mb-3">Skills Analysis</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-[#06A77D] mb-2 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Matched Skills ({selectedCandidate.matchedSkills.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.matchedSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#06A77D]/20 text-[#06A77D] rounded-lg text-sm border border-[#06A77D]/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedCandidate.missingSkills.length > 0 && (
                      <div>
                        <div className="text-sm text-red-400 mb-2 flex items-center space-x-2">
                          <XCircle className="w-4 h-4" />
                          <span>Missing Skills ({selectedCandidate.missingSkills.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.missingSkills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm border border-red-500/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      updateCandidateStatus(selectedCandidate.id, 'Shortlisted');
                      setSelectedCandidate(null);
                    }}
                    className="flex-1 px-6 py-3 bg-[#06A77D] hover:bg-[#06A77D]/80 rounded-lg font-semibold transition-all"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => {
                      updateCandidateStatus(selectedCandidate.id, 'Rejected');
                      setSelectedCandidate(null);
                    }}
                    className="flex-1 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-all"
                  >
                    Reject
                  </button>
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
            <div className="glass-panel rounded-2xl max-w-2xl w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upload Resumes</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-[#FF6B35] transition-colors">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop resumes here</h3>
                <p className="text-sm text-gray-400 mb-4">or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-block px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold cursor-pointer transition-all"
                >
                  Select Files
                </label>
                <p className="text-xs text-gray-500 mt-4">Supports PDF, DOC, DOCX (Max 50 files)</p>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
