import React, { useState, useEffect } from 'react';
import { generateLearningPath, getMyLearningPath, updateProgress } from '../../api/authApi';

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 animate-slideUp">
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-3">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-64 animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-48 animate-pulse"></div>
      </div>
      <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl w-40 animate-pulse"></div>
    </div>
    
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-slate-200 p-6 rounded-2xl animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex justify-between items-center">
            <div className="space-y-3 flex-1">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/2 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-32 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Course status badge component
const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Completed':
        return {
          bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
          text: 'text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM14 15V17H22V15H14ZM14 19V21H22V19H14ZM14 11V13H22V11H14Z"/>
            </svg>
          )
        };
      case 'In Progress':
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
          text: 'text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          )
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-slate-400 to-slate-500',
          text: 'text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          )
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.bg} ${config.text} px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg backdrop-blur-sm`}>
      {config.icon}
      <span>{status || 'Not Started'}</span>
    </div>
  );
};

export default function LearningPathDisplay() {
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generatingPath, setGeneratingPath] = useState(false);

  const fetchPath = async () => {
    setLoading(true);
    try {
      const response = await getMyLearningPath();
      if (response.data.success) {
        setLearningPath(response.data.data);
      }
    } catch (err) {
      console.log("No existing learning path found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPath();
  }, []);

  const handleGeneratePath = async () => {
    setGeneratingPath(true);
    setError('');
    try {
      const response = await generateLearningPath();
      if (response.data.success) {
        setLearningPath(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate learning path.");
    } finally {
      setGeneratingPath(false);
    }
  };

  const handleStatusChange = async (courseId, newStatus) => {
    try {
      // Optimistically update the UI for better UX
      const updatedCourses = learningPath.recommendedCourses.map(course =>
        course.courseId._id === courseId ? { ...course, status: newStatus } : course
      );
      setLearningPath(prev => ({ ...prev, recommendedCourses: updatedCourses }));

      // Call the backend to persist the change
      await updateProgress(courseId, newStatus);
    } catch (err) {
      console.error("Failed to update progress:", err);
      setError("Failed to save progress. Please refresh and try again.");
      fetchPath(); 
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Your Learning Journey
            </h2>
            <p className="text-slate-500 mt-1">Personalized growth path designed for you</p>
          </div>
        </div>
        
        <button 
          onClick={handleGeneratePath} 
          disabled={generatingPath}
          className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {generatingPath ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Generate New Path</span>
            </>
          )}
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl animate-fadeInUp">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Content Section */}
      {!learningPath ? (
        <div className="text-center py-16 animate-fadeInUp">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-3">No Learning Path Yet</h3>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            Ready to start your learning journey? Analyze your profile and generate a personalized learning path tailored just for you!
          </p>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeInUp">
          {/* Path Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-indigo-800 mb-2">{learningPath.pathTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{learningPath.pathDescription}</p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                label: 'Total Courses', 
                value: learningPath.recommendedCourses.length,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                ),
                gradient: 'from-blue-500 to-indigo-600'
              },
              { 
                label: 'In Progress', 
                value: learningPath.recommendedCourses.filter(c => c.status === 'In Progress').length,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                ),
                gradient: 'from-amber-500 to-orange-600'
              },
              { 
                label: 'Completed', 
                value: learningPath.recommendedCourses.filter(c => c.status === 'Completed').length,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                ),
                gradient: 'from-emerald-500 to-green-600'
              }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Course List */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Recommended Courses
            </h4>
            
            {learningPath.recommendedCourses.map((course, index) => (
              <div 
                key={course._id} 
                className="group bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors duration-200">
                          {course.courseId.title}
                        </h5>
                        <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                          <p className="text-sm text-slate-700 italic leading-relaxed">
                            <span className="text-blue-600 font-medium">Why this course: </span>
                            "{course.personalizedReason}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <StatusBadge status={course.status} />
                    
                    <div className="flex gap-2">
                      {(!course.status || course.status === 'Not Started') && (
                        <button 
                          onClick={() => handleStatusChange(course.courseId._id, 'In Progress')} 
                          className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                        >
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Start Course
                        </button>
                      )}
                      
                      {course.status === 'In Progress' && (
                        <button 
                          onClick={() => handleStatusChange(course.courseId._id, 'Completed')} 
                          className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                        >
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg>
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
