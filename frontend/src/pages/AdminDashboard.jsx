import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api/authApi';

// Loading skeleton component
const UserManagementLoadingSkeleton = () => (
  <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
    <div className="space-y-6">
      <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-64 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-4">
            <div className="h-12 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-20 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// User card component
const UserCard = ({ user, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'from-emerald-500 to-green-600';
      case 'blocked': return 'from-red-500 to-rose-600';
      case 'pending': return 'from-amber-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        );
      case 'blocked':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9L12 13.5 8.5 11 7 12.5l5 5 7-7L17.5 9z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        );
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
        );
      case 'employee':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
    }
  };

  return (
    <div 
      className="group bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* User Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                {user.name}
              </h3>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${
                user.role === 'admin' ? 'from-purple-500 to-violet-600' : 'from-blue-500 to-indigo-600'
              }`}>
                {getRoleIcon(user.role)}
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">{user.email}</p>
            <p className="text-slate-500 text-xs">{user.department}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium text-sm bg-gradient-to-r ${getStatusColor(user.status)} shadow-lg`}>
          {getStatusIcon(user.status)}
          <span className="capitalize">{user.status}</span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Experience:</span>
            <span className="ml-2 font-medium text-slate-700">
              {user.profileData?.yearsOfExperience || 'N/A'} years
            </span>
          </div>
          <div>
            <span className="text-slate-500">Assessments:</span>
            <span className="ml-2 font-medium text-slate-700">
              {user.assessmentScores?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
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

    fetchUsers();
  }, []);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const blockedUsers = users.filter(u => u.status === 'blocked').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <UserManagementLoadingSkeleton />
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
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Users</h2>
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.38.56-2.63 1.46-3.54.91-.9 2.16-1.46 3.54-1.46h8c1.38 0 2.63.56 3.54 1.46.9.91 1.46 2.16 1.46 3.54v1H4z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-slate-600 mt-2">Manage and monitor all system users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        {[
          { 
            label: 'Total Users', 
            value: totalUsers,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.38.56-2.63 1.46-3.54.91-.9 2.16-1.46 3.54-1.46h8c1.38 0 2.63.56 3.54 1.46.9.91 1.46 2.16 1.46 3.54v1H4z"/>
              </svg>
            ),
            gradient: 'from-blue-500 to-indigo-600'
          },
          { 
            label: 'Active Users', 
            value: activeUsers,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            ),
            gradient: 'from-emerald-500 to-green-600'
          },
          { 
            label: 'Blocked Users', 
            value: blockedUsers,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9L12 13.5 8.5 11 7 12.5l5 5 7-7L17.5 9z"/>
              </svg>
            ),
            gradient: 'from-red-500 to-rose-600'
          },
          { 
            label: 'Administrators', 
            value: adminUsers,
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
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

      {/* Filters and Search */}
      <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Search Users</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or department..."
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterRole('all');
                setFilterStatus('all');
              }}
              className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="space-y-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Users ({filteredUsers.length})
          </h2>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-lg border border-slate-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.38.56-2.63 1.46-3.54.91-.9 2.16-1.46 3.54-1.46h8c1.38 0 2.63.56 3.54 1.46.9.91 1.46 2.16 1.46 3.54v1H4z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Users Found</h3>
            <p className="text-slate-500">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredUsers.map((user, index) => (
              <UserCard key={user._id} user={user} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
