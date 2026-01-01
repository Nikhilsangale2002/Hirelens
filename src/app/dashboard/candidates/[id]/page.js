'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, Mail, Phone, MapPin, Download, Calendar, 
  CheckCircle, XCircle, Star, Briefcase, GraduationCap,
  Award, Clock, Send, Brain, TrendingUp, AlertTriangle, ThumbsUp,
  Sparkles, Link2, Copy
} from 'lucide-react';
import { candidatesApi, interviewsApi } from '@/lib/api';

export default function CandidateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const candidateId = params.id;

  const [candidate, setCandidate] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingInterviews, setIsLoadingInterviews] = useState(false);
  const [isLoadingAiAnalysis, setIsLoadingAiAnalysis] = useState(false);
  const [error, setError] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
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
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    loadCandidate();
    loadInterviews();
  }, [candidateId]);

  const loadCandidate = async () => {
    try {
      setIsLoading(true);
      const data = await candidatesApi.getCandidate(candidateId);
      setCandidate(data.candidate);
    } catch (err) {
      setError(err.message || 'Failed to load candidate');
    } finally {
      setIsLoading(false);
    }
  };

  const loadInterviews = async () => {
    try {
      setIsLoadingInterviews(true);
      const data = await interviewsApi.getCandidateInterviews(candidateId);
      setInterviews(data.interviews || []);
      
      // Check if any interview is completed and has AI analysis
      const completedInterview = data.interviews?.find(
        i => i.interview_status === 'completed' && i.ai_score
      );
      if (completedInterview) {
        setSelectedInterview(completedInterview);
      }
    } catch (err) {
      console.error('Failed to load interviews:', err);
    } finally {
      setIsLoadingInterviews(false);
    }
  };

  const loadAiAnalysis = async (interviewId) => {
    try {
      setIsLoadingAiAnalysis(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/ai/interviews/${interviewId}/analysis`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to load AI analysis');

      const data = await response.json();
      setAiAnalysis(data);
      setShowAiAnalysis(true);
    } catch (err) {
      setToast({ show: true, message: 'Failed to load AI analysis', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    } finally {
      setIsLoadingAiAnalysis(false);
    }
  };

  const handleGenerateQuestions = async (interviewId) => {
    try {
      setGeneratingQuestions(true);
      const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      const response = await fetch(`http://localhost:5000/api/ai/interviews/${interviewId}/generate-questions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          num_questions: 5
        })
      });

      if (!response.ok) throw new Error('Failed to generate questions');

      const data = await response.json();
      setToast({ show: true, message: `${data.total_questions} AI questions generated!`, type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
      
      // Reload interviews to show updated status
      loadInterviews();
    } catch (err) {
      setToast({ show: true, message: err.message || 'Failed to generate questions', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const copyInterviewLink = (interviewId) => {
    const link = `${window.location.origin}/interview/${interviewId}`;
    navigator.clipboard.writeText(link);
    setToast({ show: true, message: 'Interview link copied to clipboard!', type: 'success' });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    try {
      // Schedule the interview
      const result = await interviewsApi.scheduleInterview({
        resume_id: parseInt(candidateId),
        job_id: candidate.job_id,
        ...interviewForm
      });
      
      setToast({ show: true, message: 'AI Interview scheduled! Generating questions...', type: 'success' });
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
      
      // Automatically generate AI questions for AI interviews
      const interviewId = result.interview?.id || result.interview_id || result.id;
      if (interviewId && interviewForm.interview_mode === 'ai') {
        try {
          const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
          
          if (!token) {
            console.error('No token found for AI question generation');
            setToast({ show: true, message: 'Authentication error. Please refresh and try again.', type: 'error' });
            setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
            loadInterviews();
            return;
          }

          const response = await fetch(`http://localhost:5000/api/ai/interviews/${interviewId}/generate-questions`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ num_questions: 5 })
          });

          if (response.ok) {
            const data = await response.json();
            setToast({ show: true, message: `AI Interview ready! ${data.total_questions} questions generated.`, type: 'success' });
            setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
            loadInterviews();
          } else {
            const errorData = await response.json();
            console.error('Question generation failed:', errorData);
            setToast({ show: true, message: errorData.error || 'Failed to generate questions', type: 'error' });
            setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
          }
        } catch (err) {
          console.error('Error generating questions:', err);
          setToast({ show: true, message: 'Failed to generate questions. Please try manually.', type: 'error' });
          setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
        }
      }
      
      loadInterviews();
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    } catch (err) {
      setToast({ show: true, message: err.message || 'Failed to schedule interview', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  const handleCancelInterview = async (interviewId) => {
    try {
      await interviewsApi.cancelInterview(interviewId);
      setToast({ show: true, message: 'Interview cancelled successfully', type: 'success' });
      loadInterviews();
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    } catch (err) {
      setToast({ show: true, message: err.message || 'Failed to cancel interview', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  const handleDownloadResume = async () => {
    try {
      await candidatesApi.downloadResume(candidateId);
      setToast({ show: true, message: 'Resume opened in new tab!', type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    } catch (err) {
      setToast({ show: true, message: err.message || 'Failed to open resume', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await candidatesApi.updateCandidateStatus(candidateId, newStatus);
      setCandidate({ ...candidate, status: newStatus });
      setToast({ show: true, message: `Status updated to ${newStatus}`, type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    } catch (err) {
      setToast({ show: true, message: err.message || 'Failed to update status', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded w-1/3 mb-4"></div>
          <div className="glass-panel rounded-2xl p-6">
            <div className="h-32 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="glass-panel rounded-2xl p-12 text-center">
          <p className="text-red-400">{error || 'Candidate not found'}</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 90) return '#06A77D';
    if (score >= 75) return '#F77F00';
    return '#FF6B35';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm md:text-base">Back to Candidates</span>
        </button>
      </div>

      {/* Candidate Header */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-full flex items-center justify-center text-3xl font-bold">
              {candidate.candidate_name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{candidate.candidate_name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>{candidate.email}</span>
                </span>
                {candidate.phone && (
                  <span className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>{candidate.phone}</span>
                  </span>
                )}
                {candidate.location && (
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.location}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-4">
            <div className="text-center">
              <div
                className="text-5xl font-bold"
                style={{ color: getScoreColor(candidate.ai_score || 0) }}
              >
                {Math.round(candidate.ai_score || 0)}
              </div>
              <div className="text-sm text-gray-400">AI Score</div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              candidate.status === 'shortlisted' ? 'bg-[#06A77D]/20 text-[#06A77D]' :
              candidate.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
              candidate.status === 'hired' ? 'bg-purple-500/20 text-purple-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {candidate.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Information */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Applied For</span>
            </h2>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-lg">{candidate.job_title}</h3>
              <p className="text-sm text-gray-400 mt-1">Applied on {new Date(candidate.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Skills Match */}
          {(candidate.matched_skills?.length > 0 || candidate.missing_skills?.length > 0) && (
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Skills Assessment</h2>
              
              {candidate.matched_skills?.length > 0 && (
                <div className="mb-6">
                  <div className="text-sm text-[#06A77D] mb-2 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Matched Skills ({candidate.matched_skills.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.matched_skills.map((skill, index) => (
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

              {candidate.missing_skills?.length > 0 && (
                <div>
                  <div className="text-sm text-red-400 mb-2 flex items-center space-x-2">
                    <XCircle className="w-4 h-4" />
                    <span>Missing Skills ({candidate.missing_skills.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.missing_skills.map((skill, index) => (
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
          )}

          {/* Parsed Details */}
          {(candidate.experience || candidate.education) && (
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Background</h2>
              
              {candidate.experience && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Experience</span>
                  </div>
                  <p className="text-white">{candidate.experience}</p>
                </div>
              )}

              {candidate.education && (
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Education</span>
                  </div>
                  <p className="text-white">{candidate.education}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => updateStatus('shortlisted')}
                disabled={candidate.status === 'shortlisted'}
                className="w-full px-4 py-3 bg-[#06A77D] hover:bg-[#06A77D]/80 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Shortlist
              </button>
              <button
                onClick={() => updateStatus('rejected')}
                disabled={candidate.status === 'rejected'}
                className="w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject
              </button>
              <button
                onClick={() => updateStatus('hired')}
                disabled={candidate.status === 'hired'}
                className="w-full px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark as Hired
              </button>
              <button
                onClick={handleDownloadResume}
                className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Interviews */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">AI Interviews</h3>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 rounded text-sm transition-all flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" />
                Schedule
              </button>
            </div>

            {isLoadingInterviews ? (
              <div className="text-center py-4 text-gray-400">Loading...</div>
            ) : interviews.length > 0 ? (
              <div className="space-y-2">
                {interviews.map((interview) => (
                  <div key={interview.id} className="p-3 bg-white/5 rounded-lg">
                    <div className="font-medium capitalize text-sm">{interview.interview_type}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(interview.scheduled_date).toLocaleString()}
                    </div>
                    
                    {/* AI Questions Status */}
                    {interview.status === 'scheduled' && (
                      <div className="mt-2 space-y-2">
                        {interview.ai_questions ? (
                          <>
                            <div className="flex items-center gap-1 text-xs text-green-400">
                              <CheckCircle className="h-3 w-3" />
                              <span>AI Questions Ready</span>
                            </div>
                            <button
                              onClick={() => copyInterviewLink(interview.id)}
                              className="w-full px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs transition-all flex items-center justify-center gap-1"
                            >
                              <Copy className="h-3 w-3" />
                              Copy Interview Link
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleGenerateQuestions(interview.id)}
                            disabled={generatingQuestions}
                            className="w-full px-2 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-xs transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                          >
                            <Sparkles className="h-3 w-3" />
                            {generatingQuestions ? 'Generating...' : 'Generate AI Questions'}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Completed Interview - Show AI Score */}
                    {interview.interview_status === 'completed' && interview.ai_score && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded px-2 py-1">
                          <span className="text-xs text-gray-600">AI Score: </span>
                          <span className="text-sm font-bold text-black">{interview.ai_score}%</span>
                        </div>
                        <button
                          onClick={() => loadAiAnalysis(interview.id)}
                          className="text-xs px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 rounded transition-all"
                        >
                          View Analysis
                        </button>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
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
                          className="text-xs text-red-400 hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No interviews scheduled</p>
            )}
          </div>
        </div>
      </div>

      {/* AI Analysis Modal */}
      {showAiAnalysis && aiAnalysis && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-[#0A1929] to-[#1A2332] border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#004E89] to-[#FF6B35] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Brain className="h-7 w-7" />
                    AI Interview Analysis
                  </h2>
                  <p className="text-white/80 mt-1">{aiAnalysis.candidate_name}</p>
                </div>
                <button
                  onClick={() => setShowAiAnalysis(false)}
                  className="text-white/80 hover:text-white text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Overall Score */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-panel p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {aiAnalysis.ai_score}%
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Overall Score</div>
                </div>

                <div className="glass-panel p-6 rounded-xl text-center">
                  <div className={`text-2xl font-bold ${
                    aiAnalysis.overall_analysis?.recommendation === 'STRONG_HIRE' ? 'text-green-400' :
                    aiAnalysis.overall_analysis?.recommendation === 'HIRE' ? 'text-blue-400' :
                    aiAnalysis.overall_analysis?.recommendation === 'MAYBE' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {aiAnalysis.overall_analysis?.recommendation?.replace('_', ' ') || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Recommendation</div>
                </div>

                <div className="glass-panel p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-white">
                    {aiAnalysis.total_questions || 0}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Questions Answered</div>
                </div>
              </div>

              {/* Summary */}
              {aiAnalysis.overall_analysis?.summary && (
                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Executive Summary
                  </h3>
                  <p className="text-gray-300">{aiAnalysis.overall_analysis.summary}</p>
                </div>
              )}

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-4">
                {aiAnalysis.overall_analysis?.strengths?.length > 0 && (
                  <div className="glass-panel p-6 rounded-xl">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-400">
                      <ThumbsUp className="h-5 w-5" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {aiAnalysis.overall_analysis.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiAnalysis.overall_analysis?.weaknesses?.length > 0 && (
                  <div className="glass-panel p-6 rounded-xl">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-orange-400">
                      <AlertTriangle className="h-5 w-5" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {aiAnalysis.overall_analysis.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <XCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Decision Rationale */}
              {aiAnalysis.overall_analysis?.decision_rationale && (
                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3">Decision Rationale</h3>
                  <p className="text-gray-300">{aiAnalysis.overall_analysis.decision_rationale}</p>
                </div>
              )}

              {/* Question-by-Question Analysis */}
              {aiAnalysis.questions_with_answers?.length > 0 && (
                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4">Detailed Question Analysis</h3>
                  <div className="space-y-4">
                    {aiAnalysis.questions_with_answers.map((q, idx) => (
                      <div key={q.id} className="bg-white/5 p-4 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-white">Q{idx + 1}.</span>
                              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                                {q.category}
                              </span>
                              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                                {q.difficulty}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">{q.question}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className={`text-lg font-bold ${
                              (q.score / q.max_score) >= 0.8 ? 'text-green-400' :
                              (q.score / q.max_score) >= 0.6 ? 'text-blue-400' :
                              (q.score / q.max_score) >= 0.4 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {q.score}/{q.max_score}
                            </div>
                            <div className="text-xs text-gray-400">points</div>
                          </div>
                        </div>

                        {q.answer && (
                          <div className="mt-3 p-3 bg-black/20 rounded">
                            <div className="text-xs text-gray-400 mb-1">Answer:</div>
                            <p className="text-sm text-gray-300">{q.answer}</p>
                          </div>
                        )}

                        {q.feedback && (
                          <div className="mt-3 p-3 bg-blue-500/10 rounded border border-blue-500/20">
                            <div className="text-xs text-blue-400 mb-1">AI Feedback:</div>
                            <p className="text-sm text-gray-300">{q.feedback}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Steps */}
              {aiAnalysis.overall_analysis?.next_steps && (
                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3 text-purple-400">Recommended Next Steps</h3>
                  <p className="text-gray-300">{aiAnalysis.overall_analysis.next_steps}</p>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAiAnalysis(false)}
                  className="px-6 py-3 bg-gradient-to-r from-[#004E89] to-[#FF6B35] hover:opacity-90 rounded-lg font-semibold transition-all"
                >
                  Close Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule AI Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
          <div className="bg-[#0F1433] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#0F1433] p-6 border-b border-white/10 flex items-start justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                  Schedule AI Interview
                </h2>
                <p className="text-gray-400">{candidate.candidate_name}</p>
                <p className="text-xs text-purple-400 mt-1">AI questions will be generated automatically</p>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
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
                <label className="block text-sm font-medium mb-2">Meeting Link</label>
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
                <label className="block text-sm font-medium mb-2">Notes</label>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Schedule AI Interview
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
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-6 py-4 rounded-lg shadow-2xl ${
            toast.type === 'success' ? 'bg-[#06A77D]' : 'bg-red-500'
          }`}>
            <p className="text-white font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
