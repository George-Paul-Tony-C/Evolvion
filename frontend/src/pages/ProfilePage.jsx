import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateMyProfile } from '../api/authApi';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

// Profile Stats Card Component
const StatCard = ({ title, value, subtitle, icon, gradient, index }) => (
  <div 
    className={`bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp`}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
    </div>
  </div>
);

// Skill Progress Bar Component
const SkillProgressBar = ({ skill, index }) => (
  <div 
    className="bg-white p-4 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 animate-fadeInUp"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium text-slate-700">{skill.skillName}</span>
      <span className="text-sm font-bold text-blue-600">{skill.skillLevel}/10</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2">
      <div 
        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out relative"
        style={{ width: `${(skill.skillLevel / 10) * 100}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
    </div>
  </div>
);

// Performance Chart Component
const PerformanceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
      <YAxis stroke="#64748b" fontSize={12} />
      <Tooltip 
        contentStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          border: 'none',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      />
      <Area 
        type="monotone" 
        dataKey="score" 
        stroke="#3b82f6" 
        strokeWidth={3}
        fill="url(#colorPerformance)" 
      />
    </AreaChart>
  </ResponsiveContainer>
);

// AI Insights Component
const AIInsights = ({ insights }) => (
  <div className="space-y-4">
    {insights.identifiedSkillGaps.map((gap, index) => (
      <div 
        key={index}
        className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-4 rounded-2xl animate-fadeInUp"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-amber-800">{gap}</h4>
            <p className="text-xs text-amber-600">Recommended for skill improvement</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({ name: '', department: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        department: user.department || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await updateMyProfile(formData);
      if (response.data.success) {
        setUser(response.data.data);
        setSuccess('Profile updated successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Format data for charts
  const skillData = user?.skillAreas?.map(skill => ({
    subject: skill.skillName,
    A: skill.skillLevel,
    fullMark: 10,
  })) || [];

  const performanceData = user?.performanceRatings?.map(rating => ({
    name: rating.metric,
    score: rating.score,
    date: new Date(rating.date).toLocaleDateString()
  })) || [];

  const assessmentData = user?.assessmentScores?.map((assessment, index) => ({
    name: `Assessment ${index + 1}`,
    score: assessment.score,
    date: new Date(assessment.date).toLocaleDateString()
  })) || [];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '🎯' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'learning', label: 'Learning', icon: '📚' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {user?.name}
            </h1>
            <p className="text-xl text-slate-600 mt-2">{user?.profileData?.jobRole} • {user?.department}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>{user?.profileData?.yearsOfExperience} years exp</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                <span>{user?.status}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>{user?.learningStyle} learner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Skill Areas"
          value={user?.skillAreas?.length || 0}
          subtitle="Technical skills"
          icon={<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
          gradient="from-blue-500 to-indigo-600"
          index={0}
        />
        <StatCard 
          title="Certifications"
          value={user?.profileData?.certifications?.length || 0}
          subtitle="Professional certs"
          icon={<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/></svg>}
          gradient="from-emerald-500 to-green-600"
          index={1}
        />
        <StatCard 
          title="Assessments"
          value={user?.assessmentScores?.length || 0}
          subtitle="Completed tests"
          icon={<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>}
          gradient="from-amber-500 to-orange-600"
          index={2}
        />
        <StatCard 
          title="Learning Progress"
          value={user?.progress || 'N/A'}
          subtitle="Current status"
          icon={<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>}
          gradient="from-purple-500 to-violet-600"
          index={3}
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        <div className="border-b border-slate-200 px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Form */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">Profile Information</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl bg-slate-100 text-slate-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                      <input
                        id="department"
                        name="department"
                        type="text"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-red-700 font-medium">{error}</p>
                      </div>
                    )}
                    {success && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-green-700 font-medium">{success}</p>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </div>

                {/* AI Insights */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">AI-Powered Insights</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
                      </svg>
                      Identified Skill Gaps
                    </h4>
                    {user?.aiInsights?.identifiedSkillGaps?.length > 0 ? (
                      <AIInsights insights={user.aiInsights} />
                    ) : (
                      <p className="text-blue-600">No skill gaps identified. Great work!</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user?.profileData?.certifications?.map((cert, index) => (
                    <div key={index} className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 p-4 rounded-2xl animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-emerald-800">{cert}</p>
                          <p className="text-xs text-emerald-600">Professional Certification</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Skill Radar</h3>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{fontSize: 12, fill: '#64748b'}} />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{fontSize: 10, fill: '#64748b'}} />
                      <Radar name={user?.name} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Skill Breakdown</h3>
                <div className="space-y-4">
                  {user?.skillAreas?.map((skill, index) => (
                    <SkillProgressBar key={index} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Performance Ratings</h3>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
                    <PerformanceChart data={performanceData} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Assessment Scores</h3>
                  <div className="space-y-4">
                    {assessmentData.map((assessment, index) => (
                      <div key={index} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-slate-700">{assessment.name}</p>
                            <p className="text-sm text-slate-500">{assessment.date}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            assessment.score >= 80 ? 'bg-green-100 text-green-800' :
                            assessment.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {assessment.score}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Learning Tab */}
          {activeTab === 'learning' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Learning Preferences</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {user?.learningPreferences?.map((pref, index) => (
                      <div key={index} className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 p-4 rounded-2xl text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                          </svg>
                        </div>
                        <p className="font-semibold text-purple-800">{pref}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Learning History</h3>
                  <div className="space-y-4">
                    {user?.learningHistory?.map((history, index) => (
                      <div key={index} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-700">Course Completed</p>
                            <p className="text-sm text-slate-500">
                              {new Date(history.startDate).toLocaleDateString()} - {new Date(history.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                            </svg>
                            <span>Completed</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
