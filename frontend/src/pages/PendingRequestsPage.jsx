import React, { useState, useEffect } from 'react';
import { getAllUsers, approveSorryRequest } from '../api/authApi';

// Loading skeleton component
const RequestsLoadingSkeleton = () => (
  <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
    <div className="space-y-6">
      <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-64 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-slate-200 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/3 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-32 animate-pulse"></div>
            </div>
            <div className="h-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Request card component
const RequestCard = ({ request, index, onApprove }) => {
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async () => {
    if (window.confirm(`Are you sure you want to unblock ${request.user.name}?`)) {
      setIsApproving(true);
      try {
        await onApprove(request.user._id, request._id);
      } finally {
        setIsApproving(false);
      }
    }
  };

  const getDaysAgo = (date) => {
    const now = new Date();
    const requestDate = new Date(date);
    const diffTime = Math.abs(now - requestDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div 
      className="group bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Request Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {request.user.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-slate-800 text-lg">{request.user.name}</h3>
              <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9L12 13.5 8.5 11 7 12.5l5 5 7-7L17.5 9z"/>
                </svg>
                <span>Blocked</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm">{request.user.email}</p>
            <p className="text-slate-500 text-xs">{request.user.department}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500 mb-2">Requested</div>
          <div className="text-sm font-medium text-slate-700">
            {getDaysAgo(request.requestDate)}
          </div>
          <div className="text-xs text-slate-400">
            {new Date(request.requestDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Request Message */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          Appeal Message
        </h4>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200">
          <p className="text-slate-700 leading-relaxed italic">"{request.message}"</p>
        </div>
      </div>

      {/* Violation Details */}
      {request.user.cheatingFlags && request.user.cheatingFlags.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            Violation History ({request.user.cheatingFlags.length})
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {request.user.cheatingFlags.slice(0, 3).map((flag, flagIndex) => (
              <div key={flagIndex} className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{flag.reason}</p>
                <p className="text-red-600 text-xs mt-1">
                  {new Date(flag.date).toLocaleString()} • Detected by {flag.detectedBy}
                </p>
              </div>
            ))}
            {request.user.cheatingFlags.length > 3 && (
              <p className="text-slate-500 text-xs text-center">
                +{request.user.cheatingFlags.length - 3} more violations
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleApprove}
          disabled={isApproving}
          className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center gap-3"
        >
          {isApproving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Approving...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>Approve & Unblock</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default function PendingRequestsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApproveRequest = async (userId, requestId) => {
    try {
      await approveSorryRequest(userId, requestId);
      await fetchUsers(); // Refresh the data
    } catch (err) {
      console.error('Failed to approve request:', err);
    }
  };

  // Get pending requests
  const pendingRequests = users
    .filter(user => user.status === 'blocked' && user.sorryRequests?.some(req => req.status === 'pending'))
    .flatMap(user => 
      user.sorryRequests
        .filter(req => req.status === 'pending')
        .map(req => ({ ...req, user }))
    )
    .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <RequestsLoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-8 text-center animate-fadeInUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Requests</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl shadow-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Pending Requests
              </h1>
              <p className="text-slate-600 mt-2">Review and approve user unblock requests</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-amber-600">{pendingRequests.length}</div>
            <div className="text-sm text-slate-500">Pending Reviews</div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        {[
          { 
            label: 'Pending Requests', 
            value: pendingRequests.length,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            ),
            gradient: 'from-amber-500 to-orange-600'
          },
          { 
            label: 'Blocked Users', 
            value: users.filter(u => u.status === 'blocked').length,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9L12 13.5 8.5 11 7 12.5l5 5 7-7L17.5 9z"/>
              </svg>
            ),
            gradient: 'from-red-500 to-rose-600'
          },
          { 
            label: 'Total Violations', 
            value: users.reduce((total, user) => total + (user.cheatingFlags?.length || 0), 0),
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            ),
            gradient: 'from-purple-500 to-violet-600'
          }
        ].map((stat, index) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        {pendingRequests.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-lg border border-slate-200 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-3">All Clear!</h3>
            <p className="text-slate-500 text-lg">No pending requests to review at this time.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Review Requests ({pendingRequests.length})
              </h2>
            </div>
            
            <div className="space-y-6">
              {pendingRequests.map((request, index) => (
                <RequestCard 
                  key={request._id} 
                  request={request} 
                  index={index}
                  onApprove={handleApproveRequest}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
