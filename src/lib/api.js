// API configuration and utility functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

// Helper function to handle API responses
async function handleResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.error || 'An error occurred',
      response.status,
      data
    );
  }
  
  return data;
}

// Auth API functions
export const authApi = {
  // Sign up a new user
  async signup(name, email, password, company = '') {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        company
      }),
    });
    
    const data = await handleResponse(response);
    
    // Store tokens in localStorage
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('session_token', data.session_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Login an existing user
  async login(email, password, rememberMe = false) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    const data = await handleResponse(response);
    
    // Store tokens in localStorage or sessionStorage based on rememberMe
    const storage = rememberMe ? localStorage : sessionStorage;
    if (data.access_token) {
      storage.setItem('access_token', data.access_token);
      storage.setItem('refresh_token', data.refresh_token);
      storage.setItem('session_token', data.session_token);
      storage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Logout user
  async logout() {
    try {
      const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout error:', error);
      }
    } finally {
      // Clear all stored data
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('session_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('session_token');
      sessionStorage.removeItem('user');
    }
  },

  // Get current user
  async getCurrentUser() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Refresh access token
  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    const data = await handleResponse(response);
    
    // Update access token
    const storage = localStorage.getItem('access_token') ? localStorage : sessionStorage;
    if (data.access_token) {
      storage.setItem('access_token', data.access_token);
    }
    
    return data;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!(localStorage.getItem('access_token') || sessionStorage.getItem('access_token'));
  },

  // Get stored user
  getStoredUser() {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// User Profile API
export const userApi = {
  // Get user profile
  async getProfile() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Update user profile
  async updateProfile(profileData) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    // Check if profileData contains a file (profile_image)
    let body, headers;
    
    if (profileData instanceof FormData) {
      // If FormData is passed directly (for file upload)
      body = profileData;
      headers = {
        'Authorization': `Bearer ${token}`,
      };
    } else {
      // Regular JSON data
      body = JSON.stringify(profileData);
      headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: 'PUT',
      headers: headers,
      body: body,
    });
    
    return handleResponse(response);
  },

  // Change password
  async changePassword(currentPassword, newPassword) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
    
    return handleResponse(response);
  },

  // Get plan details
  async getPlan() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/plan`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get notification preferences
  async getNotifications() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Update notification preferences
  async updateNotifications(preferences) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/notifications`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notifications: preferences }),
    });
    
    return handleResponse(response);
  },

  // Get email configuration
  async getEmailConfig() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/email-config`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Update email configuration
  async updateEmailConfig(config) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/email-config`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    return handleResponse(response);
  },

  // Send test email
  async sendTestEmail(email) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/users/test-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    return handleResponse(response);
  }
};

// Dashboard API
export const dashboardApi = {
  // Get dashboard stats
  async getStats() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get recent jobs
  async getRecentJobs() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/dashboard/recent-jobs`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get recent activity
  async getActivity() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/dashboard/activity`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  }
};

// Jobs API
export const jobsApi = {
  // Get public jobs (no authentication required - for careers page)
  async getPublicJobs() {
    const response = await fetch(`${API_BASE_URL}/api/jobs/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Create a new job
  async createJob(jobData) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/jobs/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    
    return handleResponse(response);
  },

  // Get all jobs
  async getJobs(status = null) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const url = status 
      ? `${API_BASE_URL}/api/jobs/?status=${status}`
      : `${API_BASE_URL}/api/jobs/`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get single job by ID
  async getJob(jobId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Update job
  async updateJob(jobId, jobData) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    
    return handleResponse(response);
  },

  // Delete job
  async deleteJob(jobId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  }
};

// Candidates API
export const candidatesApi = {
  // Get all candidates across all jobs
  async getAllCandidates(status = null, search = null) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    const url = `${API_BASE_URL}/api/candidates/all${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get candidates for a specific job
  async getJobCandidates(jobId, status = null, minScore = null, sortBy = 'score') {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (minScore) params.append('min_score', minScore);
    if (sortBy) params.append('sort_by', sortBy);
    
    const queryString = params.toString();
    const url = `${API_BASE_URL}/api/candidates/job/${jobId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get single candidate details
  async getCandidate(candidateId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/candidates/detail/${candidateId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Update candidate status
  async updateCandidateStatus(candidateId, status) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/candidates/detail/${candidateId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    return handleResponse(response);
  },

  // Delete candidate
  async deleteCandidate(candidateId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/candidates/detail/${candidateId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Download candidate resume
  async downloadResume(candidateId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/candidates/detail/${candidateId}/download`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new ApiError(data.error || 'Failed to download resume', response.status, data);
    }
    
    // Return blob for caller to handle
    return await response.blob();
  }
};

// Interview API functions
export const interviewsApi = {
  // Schedule a new interview
  async scheduleInterview(interviewData) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/interviews/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interviewData),
    });
    
    return handleResponse(response);
  },

  // Get interviews for a candidate
  async getCandidateInterviews(resumeId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/interviews/candidate/${resumeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get interviews for a job
  async getJobInterviews(jobId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/interviews/job/${jobId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Update interview
  async updateInterview(interviewId, updates) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/interviews/${interviewId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    return handleResponse(response);
  },

  // Cancel/delete interview
  async cancelInterview(interviewId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/interviews/${interviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  }
};

// Notification API functions
export const notificationsApi = {
  // Get all notifications
  async getNotifications(unreadOnly = false, limit = 50, offset = 0) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const params = new URLSearchParams();
    if (unreadOnly) params.append('unread_only', 'true');
    params.append('limit', limit);
    params.append('offset', offset);
    
    const response = await fetch(`${API_BASE_URL}/api/notifications/?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get unread count
  async getUnreadCount() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/notifications/unread-count`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Mark all as read
  async markAllAsRead() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/notifications/mark-all-read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Delete notification
  async deleteNotification(notificationId) {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Clear all notifications
  async clearAll() {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/notifications/clear-all`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  }
};

// Generic API request helper with authentication
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return handleResponse(response);
}

export { ApiError };
