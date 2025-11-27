import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileAnalysis from '../components/dashboard/ProfileAnalysis';

// Quick Action Card Component
const QuickActionCard = ({ title, description, icon, to, gradient, index, stats }) => (
  <Link 
    to={to}
    className={`group block bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp`}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      {stats && (
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-800">{stats.value}</div>
          <div className="text-xs text-slate-500">{stats.label}</div>
        </div>
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-2">
      {title}
    </h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    <div className="flex items-center gap-2 mt-4 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <span>Get started</span>
      <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </div>
  </Link>
);

// Progress Ring Component
const ProgressRing = ({ percentage, size = 100, strokeWidth = 8, color = "#3b82f6" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-slate-800">{percentage}%</span>
      </div>
    </div>
  );
};

// Recent Activity Item Component
const ActivityItem = ({ activity, index }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'assessment':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
          </svg>
        );
      case 'course':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        );
      case 'achievement':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'assessment': return 'from-blue-500 to-indigo-600';
      case 'course': return 'from-green-500 to-emerald-600';
      case 'achievement': return 'from-amber-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getActivityColor(activity.type)} flex items-center justify-center text-white shadow-md`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="font-medium text-slate-800">{activity.title}</p>
        <p className="text-sm text-slate-500">{activity.description}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-600">{activity.time}</p>
        {activity.score && (
          <p className="text-xs text-slate-500">Score: {activity.score}%</p>
        )}
      </div>
    </div>
  );
};

// Welcome Header Component
const WelcomeHeader = ({ user }) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getGreetingIcon = () => {
    if (currentHour < 12) return '🌅';
    if (currentHour < 17) return '☀️';
    return '🌙';
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getGreetingIcon()}</span>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {getGreeting()}, {user?.name?.split(' ')[0]}!
              </h1>
            </div>
            <p className="text-xl text-slate-600 mb-2">Ready to continue your learning journey?</p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{user?.department} Department</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>{user?.profileData?.yearsOfExperience || 0} years experience</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800">
              {new Date().toLocaleDateString('en-US', { day: 'numeric' })}
            </div>
            <div className="text-sm text-slate-600">
              {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [recentActivities, setRecentActivities] = useState([]);
  const [learningProgress, setLearningProgress] = useState({
    overall: 65,
    currentCourse: 'React Advanced Concepts',
    completedAssessments: 8,
    skillsImproved: 5
  });

  // Mock recent activities
  useEffect(() => {
    setRecentActivities([
      {
        type: 'assessment',
        title: 'JavaScript Fundamentals Assessment',
        description: 'Completed with excellent score',
        time: '2 hours ago',
        score: 92
      },
      {
        type: 'course',
        title: 'React Components Deep Dive',
        description: 'Started new learning module',
        time: '1 day ago'
      },
      {
        type: 'achievement',
        title: 'Problem Solver Badge Earned',
        description: 'Unlocked for consistent performance',
        time: '2 days ago'
      },
      {
        type: 'assessment',
        title: 'CSS Grid Assessment',
        description: 'Completed successfully',
        time: '3 days ago',
        score: 88
      }
    ]);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Header */}
      <WelcomeHeader user={user} />

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <QuickActionCard
          title="Take Assessment"
          description="Test your knowledge and track your progress"
          icon={
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
            </svg>
          }
          to="/assessment"
          gradient="from-blue-500 to-indigo-600"
          index={0}
          stats={{ value: learningProgress.completedAssessments, label: 'Completed' }}
        />
        
        <QuickActionCard
          title="Learning Paths"
          description="Explore curated learning journeys"
          icon={
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          }
          to="/courses"
          gradient="from-emerald-500 to-green-600"
          index={1}
          stats={{ value: '3', label: 'Active' }}
        />
        
        <QuickActionCard
          title="My Profile"
          description="View and update your profile information"
          icon={
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          }
          to="/profile"
          gradient="from-purple-500 to-violet-600"
          index={2}
          stats={{ value: '95%', label: 'Complete' }}
        />
        
        <QuickActionCard
          title="Progress History"
          description="Review your assessment and learning history"
          icon={
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
            </svg>
          }
          to="/history"
          gradient="from-amber-500 to-orange-600"
          index={3}
          stats={{ value: learningProgress.skillsImproved, label: 'Skills+' }}
        />
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        {/* Learning Progress */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Learning Progress</h3>
              <p className="text-slate-600">Your journey towards mastery</p>
            </div>
            <Link 
              to="/courses"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors duration-200"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <ProgressRing percentage={learningProgress.overall} color="#3b82f6" />
              <div className="mt-4">
                <h4 className="font-semibold text-slate-800">Overall Progress</h4>
                <p className="text-sm text-slate-500">Across all learning paths</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Current Course</p>
                    <p className="text-sm text-blue-600">{learningProgress.currentCourse}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                  <div className="text-2xl font-bold text-emerald-800">{learningProgress.completedAssessments}</div>
                  <div className="text-xs text-emerald-600">Assessments</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-center">
                  <div className="text-2xl font-bold text-purple-800">{learningProgress.skillsImproved}</div>
                  <div className="text-xs text-purple-600">Skills Improved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/95 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
            <Link 
              to="/history"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors duration-200"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <ActivityItem key={index} activity={activity} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* AI Profile Analysis */}
      <ProfileAnalysis />

      {/* Motivation Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-3xl shadow-2xl text-white animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3">🎯 Keep Up the Great Work!</h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              You've completed {learningProgress.completedAssessments} assessments this month and improved {learningProgress.skillsImproved} skills. 
              Your dedication to learning is paying off!
            </p>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/assessment"
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
              </svg>
              Take Assessment
            </Link>
            <Link 
              to="/courses"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
