// Import our central, configured apiClient

import apiClient from './apiClient';

// --- Authentication API Calls ---

export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const login = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

// --- User API Calls ---

export const getCurrentUser = () => {
  return apiClient.get('/users/current-user');
};

// --- Employee API Calls ---

export const getDashboardData = () => {
  return apiClient.get('/employee/dashboard');
};

// --- Assessment API Calls ---

export const generateAssessment = (difficulty) => {
  // We send the desired difficulty level to the backend.
  return apiClient.post('/assessment/generate', { difficulty });
};

export const flagForCheating = (reason) => {
  return apiClient.post('/assessment/flag', { reason });
};

// --- Progress API Calls ---
export const updateProgress = (courseId, status) => {
  return apiClient.post('/progress/update', { courseId, status });
};

// --- Admin API Calls ---

export const getAllUsers = () => {
  return apiClient.get('/admin/users');
};

export const getSystemMetrics = () => {
  return apiClient.get('/admin/metrics');
};

// --- Chatbot API Calls ---

export const sendChatMessage = (history) => {
  return apiClient.post('/chat/send', { history });
};

// --- Profile API Calls ---

export const analyzeProfile = () => {
  return apiClient.post('/profile/analyze');
};

export const updateMyProfile = (profileData) => {
  // profileData should be an object: { name, department }
  return apiClient.put('/profile/update', profileData);
};

// --- Learning Path API Calls ---

export const generateLearningPath = () => {
  return apiClient.post('/learning-path/generate');
};

export const getMyLearningPath = () => {
  return apiClient.get('/learning-path/my-path');
};


// --- Tracker API Calls ---

export const processAssessmentResult = (assessmentData, userAnswers, score, courseId) => {
  return apiClient.post('/tracker/process-result', { assessmentData, userAnswers, score, courseId });
};

// --- History API Calls ---

export const getAssessmentHistory = () => {
  return apiClient.get('/history/assessment');
};

export const getAssessmentDetails = (id) => {
  return apiClient.get(`/history/assessment/${id}`);
};

// --- Request API Calls ---

export const submitSorryRequest = (message) => {
  return apiClient.post('/request/submit', { message });
};

export const approveSorryRequest = (userIdToUnblock, requestId) => {
  return apiClient.post('/request/approve', { userIdToUnblock, requestId });
};