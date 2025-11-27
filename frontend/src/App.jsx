import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import AppLayout from './components/layout/AppLayout';

// Page Imports
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AssessmentPage from './pages/AssessmentPage';
import ProfilePage from './pages/ProfilePage';

// Route Protectors
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import AssessmentHistoryPage from './pages/AssessmentHistoryPage';
import AssessmentReviewPage from './pages/AssessmentReviewPage';
import LearningPathDisplay from './components/dashboard/LearningPathDisplay';
import SettingsPage from './pages/SettingsPage';

// Chatbox Component
import ChatWindow from './components/chatbot/ChatWindow';
import PendingRequestsPage from './pages/PendingRequestsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminAnalytics from './pages/AnalyticalPage';

const AuthenticatedRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/dashboard" replace />;
};

const Chatbox = () => {
  const location = useLocation();
  const [chatOpen, setChatOpen] = React.useState(false);

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  // Hide chatbox on the Assessment page
  if (location.pathname === '/assessment') return null;
  if (location.pathname === '/login') return null;
  if (location.pathname === '/register') return null;

  return (
    <div>
      {!chatOpen && (
        <button
          onClick={handleChatToggle}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center z-50"
          aria-label="Open chat"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 3.866-3.582 7-8 7a8.96 8.96 0 01-4-.93L3 21l1.07-3.21A7.963 7.963 0 013 12c0-3.866 3.582-7 8-7s8 3.134 8 7z"
            />
          </svg>
        </button>
      )}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full">
          <ChatWindow handleChatToggle={handleChatToggle} />
        </div>
      )}
    </div>
  );
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes have no layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Redirect logic */}
        <Route path="/" element={isAuthenticated ? <AuthenticatedRedirect /> : <Navigate to="/login" />} />

        {/* Protected routes are nested inside the AppLayout */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            {/* Employee Routes */}
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history" element={<AssessmentHistoryPage />} />
            <Route path="/history/:id" element={<AssessmentReviewPage />} />
            <Route path="/courses" element={<LearningPathDisplay />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/requests" element={<PendingRequestsPage/>} />
              <Route path="/analytics" element={<AnalyticsPage/>} />
              <Route path="/analytics/try" element={<AdminAnalytics/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
      {/* Chatbox */}
      <Chatbox />
    </BrowserRouter>
  );
}

export default App;
