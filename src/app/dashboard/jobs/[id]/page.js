'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Users,
  Target,
  Trash2,
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
  XCircle,
  UserCheck,
  UserX,
  UserPlus,
  DollarSign,
  Calendar
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { jobsApi, candidatesApi, interviewsApi } from '@/lib/api';

export default function JobDetail() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [minScore, setMinScore] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [candidateInterviews, setCandidateInterviews] = useState([]);
  const [isLoadingInterviews, setIsLoadingInterviews] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  // Interview form state
  const [interviewForm, setInterviewForm] = useState({
    interview_type: 'screening',
    scheduled_date: '',
    duration_minutes: 60,
    interview_mode: 'video',
    meeting_link: '',
    interviewer_name: '',
    interviewer_email: '',
    notes: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  useEffect(() => {
    if (jobId) {
      loadJob();
      loadCandidates();
    }
  }, [jobId, statusFilter, minScore, sortBy]);

  const loadJob = async () => {
    try {
      setIsLoadingJob(true);
      setError('');
      const data = await jobsApi.getJob(jobId);
      setJob(data.job);
    } catch (err) {
      setError(err.message || 'Failed to load job details');
      console.error('Load job error:', err);
    } finally {
      setIsLoadingJob(false);
    }
  };

  const loadCandidates = async () => {
    try {
      setIsLoadingCandidates(true);
      const status = statusFilter === 'all' ? null : statusFilter;
      const score = minScore ? parseInt(minScore) : null;
      const data = await candidatesApi.getJobCandidates(jobId, status, score, sortBy);
      setCandidates(data.candidates || []);
    } catch (err) {
      console.error('Load candidates error:', err);
    } finally {
      setIsLoadingCandidates(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#06A77D';
    if (score >= 60) return '#F77F00';
    return '#FF6B35';
  };

  const updateCandidateStatus = async (candidateId, newStatus) => {
    try {
      await candidatesApi.updateCandidateStatus(candidateId, newStatus);
      showToast('Candidate status updated successfully');
      loadCandidates();
      loadJob();
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDeleteCandidate = async (candidateId, e) => {
    e.stopPropagation();
    try {
      await candidatesApi.deleteCandidate(candidateId);
      setCandidates(candidates.filter(c => c.id !== candidateId));
      showToast('Candidate deleted successfully');
      loadJob();
    } catch (err) {
      showToast(err.message || 'Failed to delete candidate', 'error');
    }
  };

  const handleDownloadResume = async (candidateId, candidateName) => {
    try {
      await candidatesApi.downloadResume(candidateId, candidateName);
      showToast('Resume downloaded successfully');
    } catch (err) {
      showToast(err.message || 'Failed to download resume', 'error');
    }
  };

  const loadCandidateInterviews = async (resumeId) => {
    try {
      setIsLoadingInterviews(true);
      const data = await interviewsApi.getCandidateInterviews(resumeId);
      setCandidateInterviews(data.interviews || []);
    } catch (err) {
      console.error('Load interviews error:', err);
      setCandidateInterviews([]);
    } finally {
      setIsLoadingInterviews(false);
    }
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    try {
      const interviewData = {
        resume_id: selectedCandidate.id,
        job_id: jobId,
        ...interviewForm
      };
      
      await interviewsApi.scheduleInterview(interviewData);
      showToast('Interview scheduled successfully! Invitation email sent.');
      setShowScheduleModal(false);
      setInterviewForm({
        interview_type: 'screening',
        scheduled_date: '',
        duration_minutes: 60,
        interview_mode: 'video',
        meeting_link: '',
        interviewer_name: '',
        interviewer_email: '',
        notes: ''
      });
      loadCandidateInterviews(selectedCandidate.id);
    } catch (err) {
      showToast(err.message || 'Failed to schedule interview', 'error');
    }
  };

  const handleCancelInterview = async (interviewId) => {
    try {
      await interviewsApi.cancelInterview(interviewId);
      showToast('Interview cancelled successfully');
      loadCandidateInterviews(selectedCandidate.id);
    } catch (err) {
      showToast(err.message || 'Failed to cancel interview', 'error');
    }
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = 
      (c.candidate_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (isLoadingJob) {
    return (
      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-6 animate-pulse">
          <div className="h-8 bg-white/10 rounded w-1/3 mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <button onClick={() => router.push('/dashboard/jobs')} className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" /><span>Back to Jobs</span>
        </button>
        <div className="glass-panel rounded-2xl p-6 bg-red-500/10 border border-red-500/50">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <button
              onClick={() => router.push('/dashboard/jobs')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors mt-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">{job?.title}</h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <span>{job?.department}</span>
                <span>•</span>
                <span>{job?.location}</span>
                <span>•</span>
                <span>{job?.job_type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#004E8922', color: '#004E89' }}>
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">{job?.candidates_count || 0}</div>
            </div>
            <div className="text-sm text-gray-400">Total Candidates</div>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#06A77D22', color: '#06A77D' }}>
                <Target className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">{job?.shortlisted_count || 0}</div>
            </div>
            <div className="text-sm text-gray-400">Shortlisted</div>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#FF6B3522', color: '#FF6B35' }}>
                <XCircle className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">{job?.rejected_count || 0}</div>
            </div>
            <div className="text-sm text-gray-400">Rejected</div>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#F77F0022', color: '#F77F00' }}>
                <Star className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">
                {candidates.length > 0 ? Math.round(candidates.reduce((sum, c) => sum + (c.ai_score || 0), 0) / candidates.length) : 0}
              </div>
            </div>
            <div className="text-sm text-gray-400">Avg AI Score</div>
          </div>
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
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black [&>option]:bg-white"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
          <select
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black [&>option]:bg-white"
          >
            <option value="">All Scores</option>
            <option value="80">80+ Score</option>
            <option value="70">70+ Score</option>
            <option value="60">60+ Score</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white [&>option]:text-black [&>option]:bg-white"
          >
            <option value="date">Latest First</option>
            <option value="score">Highest Score</option>
          </select>
        </div>

        {/* Loading Candidates */}
        {isLoadingCandidates ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel rounded-2xl p-6 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    <div className="h-3 bg-white/10 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
        {/* Candidates List */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="glass-panel rounded-2xl p-6 hover-lift cursor-pointer"
              onClick={() => {
                setSelectedCandidate(candidate);
                loadCandidateInterviews(candidate.id);
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{candidate.candidate_name || 'Unknown'}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{candidate.email}</span>
                    </div>
                    {candidate.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{candidate.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Score */}
                <div className="text-center">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: getScoreColor(candidate.ai_score || 0) }}
                  >
                    {Math.round(candidate.ai_score || 0)}
                  </div>
                  <div className="text-xs text-gray-400">AI Score</div>
                </div>
              </div>

              {/* Skills Match */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Skills Match</span>
                  <span className="text-sm font-medium">
                    {(candidate.matched_skills || []).length}/{(job?.skills_required || []).length || 0}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#06A77D] to-[#004E89]"
                    style={{ width: `${((candidate.matched_skills || []).length / Math.max((job?.skills_required || []).length, 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Matched Skills */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">Matched Skills:</div>
                <div className="flex flex-wrap gap-1">
                  {(candidate.matched_skills || []).slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#06A77D]/20 text-[#06A77D] rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {(candidate.matched_skills || []).length > 3 && (
                    <span className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs">
                      +{candidate.matched_skills.length - 3}
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
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white [&>option]:text-black [&>option]:bg-white ${
                    candidate.status === 'shortlisted' ? 'bg-[#06A77D]/20 border-[#06A77D]/50' :
                    candidate.status === 'rejected' ? 'bg-red-500/20 border-red-500/50' :
                    candidate.status === 'hired' ? 'bg-purple-500/20 border-purple-500/50' :
                    'bg-blue-500/20 border-blue-500/50'
                  } border`}
                >
                  <option value="new">New</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
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
                <button
                  onClick={(e) => handleDeleteCandidate(candidate.id, e)}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm text-red-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && !isLoadingCandidates && (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
            <p className="text-gray-400">
              {searchQuery 
                ? 'Try adjusting your search or filters' 
                : 'Candidates will appear here when they apply for this job'}
            </p>
          </div>
        )}
        </>
        )}

        {/* Candidate Detail Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-[#0F1433] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-[#0F1433] p-6 border-b border-white/10 flex items-start justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCandidate.candidate_name}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{selectedCandidate.email}</span>
                    </span>
                    {selectedCandidate.phone && (
                      <span className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{selectedCandidate.phone}</span>
                      </span>
                    )}
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
                    style={{ color: getScoreColor(selectedCandidate.ai_score || 0) }}
                  >
                    {Math.round(selectedCandidate.ai_score || 0)}
                  </div>
                  <div className="text-gray-400">AI Match Score</div>
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCandidate.experience_years && (
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Experience</span>
                      </div>
                      <div className="font-medium">{selectedCandidate.experience_years} years</div>
                    </div>
                  )}
                  {selectedCandidate.education_level && (
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <GraduationCap className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Education</span>
                      </div>
                      <div className="font-medium">{selectedCandidate.education_level}</div>
                    </div>
                  )}
                </div>

                {/* Skills Analysis */}
                <div>
                  <h3 className="font-semibold mb-3">Skills Analysis</h3>
                  <div className="space-y-3">
                    {(selectedCandidate.matched_skills || []).length > 0 && (
                      <div>
                        <div className="text-sm text-[#06A77D] mb-2 flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Matched Skills ({selectedCandidate.matched_skills.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.matched_skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-[#06A77D]/20 text-[#06A77D] rounded-lg text-sm border border-[#06A77D]/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(selectedCandidate.missing_skills || []).length > 0 && (
                      <div>
                        <div className="text-sm text-red-400 mb-2 flex items-center space-x-2">
                          <XCircle className="w-4 h-4" />
                          <span>Missing Skills ({selectedCandidate.missing_skills.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.missing_skills.map((skill, index) => (
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

                {/* Interview History */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Interview History</h3>
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="px-4 py-2 bg-[#004E89] hover:bg-[#004E89]/80 rounded-lg text-sm flex items-center space-x-2 transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Interview</span>
                    </button>
                  </div>
                  
                  {isLoadingInterviews ? (
                    <div className="text-center py-4 text-gray-400">Loading interviews...</div>
                  ) : candidateInterviews.length > 0 ? (
                    <div className="space-y-2">
                      {candidateInterviews.map((interview) => (
                        <div key={interview.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium capitalize">{interview.interview_type} Interview</div>
                              <div className="text-sm text-gray-400 mt-1">
                                {new Date(interview.scheduled_date).toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {interview.duration_minutes} mins • {interview.interview_mode}
                              </div>
                              {interview.meeting_link && (
                                <a
                                  href={interview.meeting_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#06A77D] hover:underline mt-1 inline-block"
                                >
                                  Join Meeting
                                </a>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                interview.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                interview.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {interview.status}
                              </span>
                              {interview.status === 'scheduled' && (
                                <button
                                  onClick={() => handleCancelInterview(interview.id)}
                                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                                >
                                  <XIcon className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-400 bg-white/5 rounded-lg border border-white/10">
                      No interviews scheduled yet
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      updateCandidateStatus(selectedCandidate.id, 'shortlisted');
                      setSelectedCandidate(null);
                    }}
                    className="flex-1 px-6 py-3 bg-[#06A77D] hover:bg-[#06A77D]/80 rounded-lg font-semibold transition-all"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => {
                      updateCandidateStatus(selectedCandidate.id, 'rejected');
                      setSelectedCandidate(null);
                    }}
                    className="flex-1 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-all"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleDownloadResume(selectedCandidate.id, selectedCandidate.candidate_name)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Interview Modal */}
        {showScheduleModal && selectedCandidate && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-[#0F1433] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-[#0F1433] p-6 border-b border-white/10 flex items-start justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Schedule Interview</h2>
                  <p className="text-gray-400">{selectedCandidate.candidate_name}</p>
                </div>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleScheduleInterview} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Interview Type</label>
                    <select
                      value={interviewForm.interview_type}
                      onChange={(e) => setInterviewForm({...interviewForm, interview_type: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] text-white [&>option]:text-black [&>option]:bg-white"
                      required
                    >
                      <option value="screening">Screening</option>
                      <option value="technical">Technical</option>
                      <option value="hr">HR Round</option>
                      <option value="final">Final Round</option>
                      <option value="ai">AI Interview</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Interview Mode</label>
                    <select
                      value={interviewForm.interview_mode}
                      onChange={(e) => setInterviewForm({...interviewForm, interview_mode: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] text-white [&>option]:text-black [&>option]:bg-white"
                      required
                    >
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                      <option value="in-person">In-Person</option>
                      <option value="ai">AI Interview</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Date & Time</label>
                    <input
                      type="datetime-local"
                      value={interviewForm.scheduled_date}
                      onChange={(e) => setInterviewForm({...interviewForm, scheduled_date: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      value={interviewForm.duration_minutes}
                      onChange={(e) => setInterviewForm({...interviewForm, duration_minutes: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                      min="15"
                      step="15"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Meeting Link (Google Meet, Zoom, etc.)</label>
                  <input
                    type="url"
                    value={interviewForm.meeting_link}
                    onChange={(e) => setInterviewForm({...interviewForm, meeting_link: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                    placeholder="https://meet.google.com/xyz-abc-def"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Interviewer Name</label>
                    <input
                      type="text"
                      value={interviewForm.interviewer_name}
                      onChange={(e) => setInterviewForm({...interviewForm, interviewer_name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Interviewer Email</label>
                    <input
                      type="email"
                      value={interviewForm.interviewer_email}
                      onChange={(e) => setInterviewForm({...interviewForm, interviewer_email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                      placeholder="interviewer@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                  <textarea
                    value={interviewForm.notes}
                    onChange={(e) => setInterviewForm({...interviewForm, notes: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] text-white"
                    rows="3"
                    placeholder="Focus areas, preparation notes, etc."
                  />
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#06A77D] hover:bg-[#06A77D]/80 rounded-lg font-semibold transition-all"
                  >
                    Schedule & Send Invitation
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className={`px-6 py-4 rounded-lg shadow-lg border ${
              toast.type === 'error' 
                ? 'bg-red-500/90 border-red-400 text-white' 
                : 'bg-green-500/90 border-green-400 text-white'
            } backdrop-blur-sm`}>
              <div className="flex items-center space-x-3">
                {toast.type === 'error' ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                <span className="font-medium">{toast.message}</span>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
