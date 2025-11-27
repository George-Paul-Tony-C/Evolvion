import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateAssessment, processAssessmentResult } from '../api/authApi';
import { startCheatingDetector, stopCheatingDetector } from '../services/cheatingDetector';

// Enhanced Loading Component
const AssessmentLoadingSpinner = ({ message = "Generating your assessment..." }) => (
  <div className="flex flex-col justify-center items-center h-screen space-y-6 animate-fadeInUp">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
        </svg>
      </div>
    </div>
    <div className="text-center space-y-2">
      <p className="text-xl font-semibold text-slate-700">{message}</p>
      <p className="text-slate-500">Please wait while we prepare your questions...</p>
      <div className="flex items-center justify-center gap-1 mt-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

// Progress Bar Component
const ProgressBar = ({ current, total }) => {
  const percentage = ((current + 1) / total) * 100;
  
  return (
    <div className="w-full bg-slate-200 rounded-full h-3 mb-6 overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out relative"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
};

// Question Timer Component (optional)
const QuestionTimer = ({ timeLeft }) => (
  <div className="flex items-center gap-2 text-slate-600">
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
    </svg>
    <span className="text-sm font-medium">Time: {timeLeft}s</span>
  </div>
);

export default function AssessmentPage() {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const [finalScore, setFinalScore] = useState(0);
  const [intervention, setIntervention] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cheating detector lifecycle management
  useEffect(() => {
    if (assessment && !showResults) {
      startCheatingDetector();
    } else {
      stopCheatingDetector();
    }

    return () => {
      stopCheatingDetector();
    };
  }, [assessment, showResults]);

  const handleStartAssessment = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await generateAssessment('Intermediate');
      if (response.data.success) {
        setAssessment(response.data.data);
        setUserAnswers(new Array(response.data.data.questions.length).fill(null));
      } else { 
        throw new Error(response.data.message); 
      }
    } catch (err) {
      setError(err.message || "Failed to start assessment.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (choiceIndex) => {
    setSelectedAnswerIndex(choiceIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswerIndex;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
    } else {
      finishAndProcessResults(newAnswers);
    }
  };

  const finishAndProcessResults = async (finalAnswers) => {
    setIsSubmitting(true);
    let score = 0;
    assessment.questions.forEach((question, index) => {
      const userAnswerIndex = finalAnswers[index];
      if (userAnswerIndex !== null && question.choices[userAnswerIndex].isCorrect) {
        score++;
      }
    });
    setFinalScore(score);
    setShowResults(true);

    try {
      const response = await processAssessmentResult(
        assessment,
        finalAnswers,
        score,
        assessment.courseId || '6894706e342b53c79b18f4c3'
      );
      if (response.data.success && response.data.data.analysis.isPlateauing) {
        setIntervention(response.data.data.analysis.interventionSuggestion);
      }
    } catch (err) {
      console.error("Failed to process assessment results:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (loading) {
    return <AssessmentLoadingSpinner />;
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-md mx-auto bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-8 text-center animate-fadeInUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Assessment Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={() => setError('')}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  // Start Assessment State
  if (!assessment) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Ready for Your Assessment?
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Test your skills with our AI-generated questions tailored to your profile. 
              Get instant feedback and personalized recommendations for improvement.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
                    </svg>
                  ),
                  title: "AI-Powered Questions",
                  description: "Personalized questions based on your skill gaps"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                    </svg>
                  ),
                  title: "Real-Time Progress",
                  description: "Track your performance as you progress"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                  title: "Instant Results",
                  description: "Get immediate feedback and recommendations"
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={handleStartAssessment} 
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 mx-auto"
            >
              <svg className="w-6 h-6 transition-transform duration-200 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Start Assessment</span>
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            
            <p className="text-sm text-slate-500 mt-4">
              Assessment takes approximately 10-15 minutes • Intermediate Level
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Results State
  if (showResults) {
    const scorePercentage = Math.round((finalScore / assessment.questions.length) * 100);
    const getScoreColor = () => {
      if (scorePercentage >= 80) return 'from-emerald-500 to-green-600';
      if (scorePercentage >= 60) return 'from-amber-500 to-orange-600';
      return 'from-red-500 to-rose-600';
    };

    const getPerformanceLevel = () => {
      if (scorePercentage >= 80) return 'Excellent';
      if (scorePercentage >= 60) return 'Good';
      return 'Needs Improvement';
    };

    const getPerformanceIcon = () => {
      if (scorePercentage >= 80) {
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      } else if (scorePercentage >= 60) {
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        );
      } else {
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        );
      }
    };

    return (
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Results Header */}
          <div className="bg-white/95 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20 text-center animate-slideUp">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${getScoreColor()} flex items-center justify-center text-white shadow-lg`}>
              {getPerformanceIcon()}
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Assessment Complete!
            </h1>
            <p className="text-xl text-slate-600 mb-8">Congratulations on completing your skill assessment</p>
            
            {/* Score Display */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 mb-2">Your Score</p>
                  <p className="text-4xl font-bold text-slate-800">
                    {finalScore}<span className="text-2xl text-slate-500">/{assessment.questions.length}</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 mb-2">Percentage</p>
                  <p className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
                    {scorePercentage}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 mb-2">Performance</p>
                  <p className="text-2xl font-bold text-slate-800">{getPerformanceLevel()}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreColor()} rounded-full transition-all duration-1000 ease-out relative`}
                    style={{ width: `${scorePercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Intervention */}
          {intervention && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-amber-800 mb-2">AI Tutor Recommendation</h3>
                  <p className="text-amber-700 leading-relaxed">{intervention}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <Link 
              to="/history"
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3 justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
              </svg>
              <span>View All Results</span>
            </Link>
            <Link 
              to="/dashboard"
              className="group bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3 justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Question State
  const currentQuestion = assessment.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;
  
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slideUp">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Skill Assessment
          </h1>
          <p className="text-slate-600">Question {currentQuestionIndex + 1} of {assessment.questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <ProgressBar current={currentQuestionIndex} total={assessment.questions.length} />
        </div>

        {/* Question Card */}
        <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {/* Question Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {currentQuestionIndex + 1}
                </div>
                <div className="text-slate-500 text-sm">
                  <span className="font-medium">Question {currentQuestionIndex + 1}</span> of {assessment.questions.length}
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 leading-relaxed">
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = selectedAnswerIndex === index;
              const optionLabels = ['A', 'B', 'C', 'D'];
              
              return (
                <button 
                  key={index} 
                  onClick={() => handleAnswerSelect(index)} 
                  className={`group w-full text-left p-6 border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-[1.02] ${
                    isSelected 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 shadow-lg' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      {optionLabels[index]}
                    </div>
                    <span className={`text-lg leading-relaxed transition-colors duration-200 ${
                      isSelected ? 'text-blue-800 font-medium' : 'text-slate-700 group-hover:text-slate-800'
                    }`}>
                      {choice.option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
              Select an answer to continue
            </div>
            <button 
              onClick={handleNextQuestion} 
              disabled={selectedAnswerIndex === null || isSubmitting}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLastQuestion ? 'Finish Assessment' : 'Next Question'}</span>
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
