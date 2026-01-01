'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function CandidateInterviewPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = params.id;
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [error, setError] = useState(null);
  const [tabSwitchWarning, setTabSwitchWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [autoSubmitTimer, setAutoSubmitTimer] = useState(null);
  const [violations, setViolations] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [idleSeconds, setIdleSeconds] = useState(0);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  const MAX_VIOLATIONS = 3;
  const IDLE_TIMEOUT = 120; // 2 minutes
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [deviceFingerprint, setDeviceFingerprint] = useState(null);

  // Check authentication
  useEffect(() => {
    if (interviewId) {
      // Generate device fingerprint
      const fp = generateFingerprint();
      setDeviceFingerprint(fp);

      // Check if candidate is authenticated
      const authData = sessionStorage.getItem(`interview_${interviewId}_auth`);
      if (!authData) {
        // Not authenticated, redirect to login
        router.push(`/interview/${interviewId}/login`);
        return;
      }
      
      // Check if auth is still valid (24 hours)
      const auth = JSON.parse(authData);
      const hoursSinceAuth = (Date.now() - auth.timestamp) / (1000 * 60 * 60);
      if (hoursSinceAuth > 24) {
        sessionStorage.removeItem(`interview_${interviewId}_auth`);
        router.push(`/interview/${interviewId}/login`);
        return;
      }
      
      fetchInterview();
      
      // Log interview start
      setTimeout(() => {
        logSecurityEvent('interview_started', { deviceFingerprint: fp });
      }, 1000);
    }
  }, [interviewId]);

  // Fullscreen enforcement
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (err) {
        console.log('Fullscreen not supported or denied');
      }
    };

    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      
      if (!isNowFullscreen && questions.length > 0) {
        // Exited fullscreen - count as violation
        const newViolations = violations + 1;
        setViolations(newViolations);
        setShowSecurityWarning(true);
        
        // Log event
        logSecurityEvent('fullscreen_exit', { 
          violations: newViolations,
          maxViolations: MAX_VIOLATIONS 
        });
        
        if (newViolations >= MAX_VIOLATIONS) {
          alert('⚠️ Maximum security violations reached. Interview will be auto-submitted.');
          handleAutoSubmit();
        } else {
          setTimeout(() => enterFullscreen(), 2000);
        }
      }
    };

    if (interview && questions.length > 0) {
      enterFullscreen();
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [interview, questions, violations]);

  // Browser DevTools Detection
  useEffect(() => {
    if (!interview || questions.length === 0) return;

    let devtoolsOpen = false;
    const threshold = 160;

    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      const orientation = widthThreshold ? 'vertical' : 'horizontal';

      if (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          setDevToolsOpen(true);
          const newViolations = violations + 1;
          setViolations(newViolations);
          setShowSecurityWarning(true);
          
          logSecurityEvent('devtools_opened', { 
            orientation,
            violations: newViolations 
          });

          if (newViolations >= MAX_VIOLATIONS) {
            alert('⚠️ Developer Tools detected. Interview auto-submitted for security.');
            handleAutoSubmit();
          }
        }
      } else {
        if (devtoolsOpen) {
          devtoolsOpen = false;
          setDevToolsOpen(false);
          logSecurityEvent('devtools_closed', {});
        }
      }
    };

    // Check every 1 second
    const interval = setInterval(detectDevTools, 1000);

    // Also check on resize
    window.addEventListener('resize', detectDevTools);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', detectDevTools);
    };
  }, [interview, questions, violations]);

  // Prevent copy/paste and right-click
  useEffect(() => {
    const preventCheating = (e) => {
      // Prevent right-click
      if (e.type === 'contextmenu') {
        e.preventDefault();
        return false;
      }

      // Prevent certain keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        const isTextarea = e.target.tagName === 'TEXTAREA';
        
        // Allow copy/paste ONLY in textarea
        if (['c', 'v', 'x'].includes(key) && !isTextarea) {
          e.preventDefault();
          return false;
        }
        
        // Prevent Ctrl+A outside textarea
        if (key === 'a' && !isTextarea) {
          e.preventDefault();
          return false;
        }
        
        // Prevent print, save, devtools
        if (['p', 's', 'i', 'j', 'u'].includes(key)) {
          e.preventDefault();
          return false;
        }
      }

      // Prevent F12, F11
      if ([123, 122].includes(e.keyCode)) {
        e.preventDefault();
        return false;
      }
    };

    const preventSelection = (e) => {
      // Prevent text selection on questions (not textarea)
      if (e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
          selection.removeAllRanges();
        }
      }
    };

    document.addEventListener('contextmenu', preventCheating);
    document.addEventListener('keydown', preventCheating);
    document.addEventListener('selectstart', preventSelection);

    return () => {
      document.removeEventListener('contextmenu', preventCheating);
      document.removeEventListener('keydown', preventCheating);
      document.removeEventListener('selectstart', preventSelection);
    };
  }, []);

  // Idle detection
  useEffect(() => {
    if (!interview || questions.length === 0) return;

    let idleTimer;
    const resetIdle = () => setIdleSeconds(0);

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => document.addEventListener(event, resetIdle, true));

    const interval = setInterval(() => {
      setIdleSeconds(prev => {
        const newIdle = prev + 1;
        
        if (newIdle >= IDLE_TIMEOUT) {
          logSecurityEvent('auto_submit_idle', { idleSeconds: newIdle });
          alert('⚠️ Interview auto-submitted due to inactivity (2 minutes).');
          handleAutoSubmit();
          return prev;
        }
        
        // Show warning at 90 seconds
        if (newIdle === 90) {
          setShowSecurityWarning(true);
          logSecurityEvent('idle_warning', { idleSeconds: 90 });
          setTimeout(() => setShowSecurityWarning(false), 5000);
        }
        
        return newIdle;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      events.forEach(event => document.removeEventListener(event, resetIdle, true));
    };
  }, [interview, questions]);

  // Timer
  useEffect(() => {
    if (interview && interview.duration_minutes && timeRemaining === null) {
      const duration = interview.duration_minutes * 60; // Convert to seconds
      setTimeRemaining(duration);
    }

    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, interview]);

  // Tab switch detection and auto-submit
  useEffect(() => {
    if (!interview || questions.length === 0) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tab or minimized window
        const newViolations = violations + 1;
        setViolations(newViolations);
        setTabSwitchCount(prev => prev + 1);
        setTabSwitchWarning(true);
        setShowSecurityWarning(true);
        
        // Log tab switch event
        logSecurityEvent('tab_switch', { 
          switchNumber: tabSwitchCount + 1,
          violations: newViolations 
        });
        
        if (newViolations >= MAX_VIOLATIONS) {
          // Maximum violations - auto-submit immediately
          alert('⚠️ Maximum security violations reached (3/3). Interview auto-submitted.');
          handleAutoSubmit();
          return;
        }
        
        // Start 10-second countdown to auto-submit
        const timer = setTimeout(() => {
          if (document.hidden) {
            logSecurityEvent('auto_submit_timeout', { reason: 'tab_switch_timeout' });
            alert('⚠️ Interview auto-submitted: You did not return within 10 seconds.');
            handleAutoSubmit();
          }
        }, 10000);
        
        setAutoSubmitTimer(timer);
      } else {
        // User came back
        setTabSwitchWarning(false);
        // Clear the auto-submit timer
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
          setAutoSubmitTimer(null);
        }
        
        logSecurityEvent('tab_returned', { secondsAway: 'unknown' });
        
        // Keep security warning for 3 seconds
        setTimeout(() => setShowSecurityWarning(false), 3000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (autoSubmitTimer) {
        clearTimeout(autoSubmitTimer);
      }
    };
  }, [autoSubmitTimer, interview, questions, violations, tabSwitchCount]);

  const fetchInterview = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ai/interviews/${interviewId}/questions`);

      if (!response.ok) throw new Error('Failed to load interview');

      const data = await response.json();
      setInterview(data);
      setQuestions(data.questions || []);

      // Load existing answers
      const existingAnswers = {};
      data.questions?.forEach(q => {
        if (q.answer) {
          existingAnswers[q.id] = q.answer;
        }
      });
      setAnswers(existingAnswers);

      // Find first unanswered question
      const firstUnanswered = data.questions?.findIndex(q => !q.answer);
      if (firstUnanswered !== -1) {
        setCurrentQuestionIndex(firstUnanswered);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate device fingerprint
  const generateFingerprint = () => {
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory || 'unknown',
      screenResolution: `${screen.width}x${screen.height}`,
      screenColorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      touchSupport: 'ontouchstart' in window,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      timestamp: Date.now()
    };
    return fingerprint;
  };

  // Log security event to backend
  const logSecurityEvent = async (eventType, metadata = {}) => {
    try {
      await fetch(`http://localhost:5000/api/ai/interviews/${interviewId}/log-activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: eventType,
          timestamp: new Date().toISOString(),
          metadata: {
            ...metadata,
            deviceFingerprint,
            violations,
            tabSwitchCount,
            currentQuestion: currentQuestionIndex + 1
          }
        })
      });
    } catch (err) {
      console.error('Failed to log security event:', err);
    }
  };

  const submitAnswer = async (questionId, answer) => {
    try {
      const response = await fetch(`http://localhost:5000/api/ai/interviews/${interviewId}/submit-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question_id: questionId,
          answer: answer
        })
      });

      if (!response.ok) throw new Error('Failed to submit answer');

      return true;
    } catch (err) {
      console.error('Error submitting answer:', err);
      throw err;
    }
  };

  const handleNextQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (!currentAnswer.trim()) {
      alert('Please provide an answer before proceeding');
      return;
    }

    setSubmitting(true);

    try {
      await submitAnswer(currentQuestion.id, currentAnswer);
      
      // Log answer submission
      logSecurityEvent('answer_submitted', {
        questionId: currentQuestion.id,
        questionNumber: currentQuestionIndex + 1,
        answerLength: currentAnswer.length,
        timeSpent: 'tracked'
      });
      
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: currentAnswer
      }));

      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        const nextQuestion = questions[currentQuestionIndex + 1];
        setCurrentAnswer(answers[nextQuestion.id] || '');
      } else {
        // All questions answered, complete interview
        await completeInterview();
      }

    } catch (err) {
      alert('Failed to submit answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const completeInterview = async () => {
    setCompleting(true);

    try {
      // Log completion attempt
      logSecurityEvent('interview_completing', {
        totalViolations: violations,
        totalTabSwitches: tabSwitchCount,
        devToolsDetected: devToolsOpen
      });

      const response = await fetch(`http://localhost:5000/api/ai/interviews/${interviewId}/complete`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Failed to complete interview');

      const data = await response.json();

      // Log successful completion
      logSecurityEvent('interview_completed', {
        score: data.ai_score,
        recommendation: data.recommendation
      });

      // Close window after showing success message
      alert(`✅ Interview completed successfully! Thank you for your time.\n\nYour responses have been submitted and will be reviewed by our team.`);
      
      // Close the window/tab
      window.close();
      
      // If window.close() doesn't work (browser restrictions), show completion page
      setTimeout(() => {
        router.push('/interview-complete');
      }, 500);

    } catch (err) {
      alert('Failed to complete interview. Please try again.');
    } finally {
      setCompleting(false);
    }
  };

  const handleAutoSubmit = async () => {
    if (currentAnswer.trim()) {
      await submitAnswer(questions[currentQuestionIndex].id, currentAnswer);
    }
    await completeInterview();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((Object.keys(answers).length) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      {/* Security Warning Banner */}
      {showSecurityWarning && (
        <div className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 shadow-lg ${
          violations >= MAX_VIOLATIONS - 1 ? 'bg-red-600 animate-pulse' : 'bg-orange-600'
        }`}>
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6" />
                <div>
                  <p className="font-bold text-lg">
                    {violations >= MAX_VIOLATIONS - 1 
                      ? '🚨 FINAL WARNING' 
                      : idleSeconds >= 90 
                      ? '⏰ INACTIVITY DETECTED' 
                      : '⚠️ SECURITY VIOLATION'}
                  </p>
                  <p className="text-sm">
                    {violations >= MAX_VIOLATIONS - 1
                      ? 'One more violation will auto-submit your interview!'
                      : idleSeconds >= 90
                      ? `Idle for ${idleSeconds} seconds. Auto-submit in ${IDLE_TIMEOUT - idleSeconds} seconds.`
                      : `Violations: ${violations}/${MAX_VIOLATIONS}. Return to fullscreen immediately.`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{violations}/{MAX_VIOLATIONS}</div>
                <div className="text-xs">Violations</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Switch Warning Banner */}
      {tabSwitchWarning && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-red-600 text-white py-4 px-6 shadow-lg animate-pulse">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6" />
              <div>
                <p className="font-bold text-lg">⚠️ WARNING: Do not leave this page!</p>
                <p className="text-sm">Return immediately or your interview will be auto-submitted in 10 seconds.</p>
                <p className="text-xs mt-1">Tab switches: {tabSwitchCount}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      {interview && !isFullscreen && (
        <div className="fixed bottom-4 right-4 z-50 bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 max-w-sm shadow-xl">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-700 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-900">Fullscreen Required</p>
              <p className="text-xs text-yellow-800">Press F11 or click to enter fullscreen mode.</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-black">{interview?.job_title}</h1>
              <p className="text-gray-600">AI Interview Assessment</p>
            </div>
            {timeRemaining !== null && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="h-5 w-5" />
                <span className="font-mono text-lg font-semibold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Object.keys(answers).length} of {questions.length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentQuestionIndex + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {currentQuestion?.category || 'General'}
                </span>
                <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  {currentQuestion?.difficulty || 'Medium'}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-black mb-4">
                {currentQuestion?.question}
              </h2>
            </div>
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer
            </label>
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black"
              placeholder="Type your answer here... Be specific and provide examples where possible."
              disabled={submitting || completing}
            />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
              <span>{currentAnswer.length} characters</span>
              <span>Min 50 characters recommended</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  setCurrentAnswer(answers[questions[currentQuestionIndex - 1].id] || '');
                }
              }}
              disabled={currentQuestionIndex === 0 || submitting || completing}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={submitting || completing || !currentAnswer.trim()}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {submitting || completing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {completing ? 'Completing...' : 'Submitting...'}
                </>
              ) : currentQuestionIndex === questions.length - 1 ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Complete Interview
                </>
              ) : (
                <>
                  Next Question
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentQuestionIndex(idx);
                  setCurrentAnswer(answers[q.id] || '');
                }}
                className={`h-10 rounded-lg font-semibold transition-all ${
                  idx === currentQuestionIndex
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : answers[q.id]
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
