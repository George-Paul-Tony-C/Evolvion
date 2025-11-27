import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssessmentHistory } from '../api/authApi';

// Loading skeleton component
const HistoryLoadingSkeleton = () => (
  <div className="space-y-8 animate-slideUp">
    {/* Take Assessment Section Skeleton */}
    <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl animate-pulse"></div>
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-64 mx-auto animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-96 mx-auto animate-pulse"></div>
        <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl w-48 mx-auto animate-pulse"></div>
      </div>
    </div>

    {/* History Section Skeleton */}
    <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
      <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-48 mb-6 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-slate-200 p-6 rounded-2xl animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex justify-between items-center">
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-48 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-32 animate-pulse"></div>
              </div>
              <div className="space-y-2 text-right">
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-24 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Assessment card component
const AssessmentCard = ({ assessment, index }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'from-emerald-500 to-green-600';
    if (score >= 60) return 'from-amber-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    } else if (score >= 60) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      );
    }
  };

  const score = assessment.proficiencyScores.overall;
  const date = new Date(assessment.completionDate);

  return (
    <div 
      className="group bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                Assessment Completed
              </p>
              <p className="text-sm text-slate-500">
                {date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-slate-400">
                {date.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Score Badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r ${getScoreColor(score)} shadow-lg`}>
            {getScoreIcon(score)}
            <span className="font-bold text-lg">{score*20}%</span>
          </div>
          
          {/* View Details Button */}
          <Link 
            to={`/history/${assessment._id}`} 
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            <span>View Details</span>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Performance Indicator */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Performance Level:</span>
          <span className={`font-medium ${
            score >= 80 ? 'text-emerald-600' : 
            score >= 60 ? 'text-amber-600' : 'text-red-600'
          }`}>
            {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
        <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(score)} transition-all duration-500`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function AssessmentHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getAssessmentHistory();
        if (response.data.success) {
          setHistory(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <HistoryLoadingSkeleton />
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
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading History</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalAssessments = history.length;
  const averageScore = totalAssessments > 0 
    ? Math.round(history.reduce((sum, item) => sum + item.proficiencyScores.overall, 0) / totalAssessments)
    : 0;
  const bestScore = totalAssessments > 0 
    ? Math.max(...history.map(item => item.proficiencyScores.overall))
    : 0;
  const recentAssessments = history.slice(0, 3).length;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Take New Assessment Section */}
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"/>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Skill Assessment Center
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Test your knowledge and track your progress with our AI-powered assessments. 
            Get personalized feedback and discover areas for improvement.
          </p>
          
          <Link 
            to="/assessment" 
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl"
          >
            <svg className="w-6 h-6 transition-transform duration-200 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span>Take New Assessment</span>
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>AI-Powered Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>Personalized Feedback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment History Section */}
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Assessment History</h2>
              <p className="text-slate-500 mt-1">Track your progress and improvement over time</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {totalAssessments > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { 
                label: 'Total Tests', 
                value: totalAssessments,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
                  </svg>
                ),
                gradient: 'from-blue-500 to-indigo-600'
              },
              { 
                label: 'Average Score', 
                value: `${averageScore}%`,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                ),
                gradient: 'from-emerald-500 to-green-600'
              },
              { 
                label: 'Best Score', 
                value: `${bestScore}%`,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ),
                gradient: 'from-amber-500 to-orange-600'
              },
              { 
                label: 'This Month', 
                value: recentAssessments,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                ),
                gradient: 'from-purple-500 to-violet-600'
              }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assessment List */}
        {totalAssessments === 0 ? (
          <div className="text-center py-16 animate-fadeInUp">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-3">No Assessments Yet</h3>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
              You haven't completed any assessments yet. Take your first assessment to start tracking your progress!
            </p>
            <Link 
              to="/assessment" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              Take Your First Assessment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((assessment, index) => (
              <AssessmentCard key={assessment._id} assessment={assessment} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
