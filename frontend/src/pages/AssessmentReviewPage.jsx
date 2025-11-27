import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAssessmentDetails } from '../api/authApi';

// Enhanced Loading Component
const ReviewLoadingSpinner = () => (
  <div className="container mx-auto p-6">
    <div className="max-w-4xl mx-auto space-y-8 animate-slideUp">
      {/* Navigation Skeleton */}
      <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-32 animate-pulse"></div>
      
      {/* Header Skeleton */}
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <div className="space-y-4">
          <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-2/3 animate-pulse"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/3 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4 mb-2 animate-pulse"></div>
              <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Questions Skeleton */}
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-full mb-4 animate-pulse"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(j => (
              <div key={j} className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Question Review Component
const QuestionReview = ({ question, questionIndex, userAnswer, assessment }) => {
  const correctAnswer = question.choices.find(c => c.isCorrect)?.option;
  const userResponse = assessment.responses.find(r => r.questionIndex === questionIndex);
  const selectedOption = userResponse?.answer;
  const isCorrect = selectedOption === correctAnswer;
  const optionLabels = ['A', 'B', 'C', 'D'];

  const getChoiceStatus = (choice) => {
    if (choice.option === correctAnswer) return 'correct';
    if (choice.option === selectedOption && selectedOption !== correctAnswer) return 'incorrect';
    return 'neutral';
  };

  const getChoiceStyles = (status) => {
    switch (status) {
      case 'correct':
        return 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-500 shadow-lg';
      case 'incorrect':
        return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-500 shadow-lg';
      default:
        return 'bg-white border-slate-200';
    }
  };

  const getIconForStatus = (status) => {
    switch (status) {
      case 'correct':
        return (
          <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        );
      case 'incorrect':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
      style={{ animationDelay: `${questionIndex * 0.1}s` }}
    >
      {/* Question Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white flex-shrink-0 ${
          isCorrect 
            ? 'bg-gradient-to-br from-emerald-500 to-green-600' 
            : 'bg-gradient-to-br from-red-500 to-rose-600'
        } shadow-lg`}>
          {questionIndex + 1}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-slate-800">
              Question {questionIndex + 1}
            </h3>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              isCorrect 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isCorrect ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  <span>Correct</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                  <span>Incorrect</span>
                </>
              )}
            </div>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed">{question.questionText}</p>
        </div>
      </div>

      {/* Answer Choices */}
      <div className="space-y-4">
        {question.choices.map((choice, choiceIndex) => {
          const status = getChoiceStatus(choice);
          const isSelected = choice.option === selectedOption;
          
          return (
            <div 
              key={choiceIndex}
              className={`group relative p-4 border-2 rounded-2xl transition-all duration-300 ${getChoiceStyles(status)}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                  status === 'correct' 
                    ? 'bg-emerald-500 text-white' 
                    : status === 'incorrect'
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {optionLabels[choiceIndex]}
                </div>
                <span className="text-lg text-slate-700 flex-1 leading-relaxed">
                  {choice.option}
                </span>
                <div className="flex items-center gap-3">
                  {isSelected && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Your Answer
                    </div>
                  )}
                  {getIconForStatus(status)}
                </div>
              </div>

              {/* Explanation for correct answer */}
              {status === 'correct' && (
                <div className="mt-3 pt-3 border-t border-emerald-200">
                  <p className="text-sm text-emerald-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    This is the correct answer
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Learning Insight */}
      {!isCorrect && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Learning Opportunity</h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                The correct answer is "<strong>{correctAnswer}</strong>". Consider reviewing this topic to strengthen your understanding.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function AssessmentReviewPage() {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getAssessmentDetails(id);
        if (response.data.success) {
          setAssessment(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return <ReviewLoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-md mx-auto bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-8 text-center animate-fadeInUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Review</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link 
            to="/history"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            Back to History
          </Link>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 text-center animate-fadeInUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Assessment Not Found</h2>
          <p className="text-slate-600 mb-6">The requested assessment could not be found.</p>
          <Link 
            to="/history"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            Back to History
          </Link>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalQuestions = assessment.questions.length;
  const correctAnswers = assessment.questions.filter((q, index) => {
    const userResponse = assessment.responses.find(r => r.questionIndex === index);
    const correctAnswer = q.choices.find(c => c.isCorrect)?.option;
    return userResponse?.answer === correctAnswer;
  }).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const completionDate = new Date(assessment.completionDate);

  const getPerformanceColor = () => {
    if (scorePercentage >= 80) return 'from-emerald-500 to-green-600';
    if (scorePercentage >= 60) return 'from-amber-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getPerformanceLevel = () => {
    if (scorePercentage >= 80) return 'Excellent';
    if (scorePercentage >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="animate-slideUp">
          <Link 
            to="/history" 
            className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            <span>Back to Assessment History</span>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                Assessment Review
              </h1>
              <div className="space-y-2 text-slate-600">
                <p className="text-lg">
                  Completed on {completionDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm">
                  at {completionDate.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${getPerformanceColor()} flex items-center justify-center text-white shadow-lg`}>
              <div className="text-center">
                <div className="text-2xl font-bold">{scorePercentage}</div>
                <div className="text-xs">%</div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { 
                label: 'Final Score', 
                value: `${correctAnswers}/${totalQuestions}`,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ),
                gradient: 'from-blue-500 to-indigo-600'
              },
              { 
                label: 'Percentage', 
                value: `${scorePercentage}%`,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                ),
                gradient: getPerformanceColor().replace('from-', 'from-').replace('to-', 'to-')
              },
              { 
                label: 'Correct Answers', 
                value: correctAnswers,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                ),
                gradient: 'from-emerald-500 to-green-600'
              },
              { 
                label: 'Incorrect Answers', 
                value: incorrectAnswers,
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                ),
                gradient: 'from-red-500 to-rose-600'
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

          {/* Performance Summary */}
          <div className="mt-6 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-800">Overall Performance</h3>
              <span className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getPerformanceColor()}`}>
                {getPerformanceLevel()}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${getPerformanceColor()} transition-all duration-1000 ease-out relative`}
                style={{ width: `${scorePercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Question-by-Question Review</h2>
          </div>

          {assessment.questions.map((question, questionIndex) => (
            <QuestionReview 
              key={questionIndex}
              question={question}
              questionIndex={questionIndex}
              userAnswer={assessment.responses.find(r => r.questionIndex === questionIndex)?.answer}
              assessment={assessment}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <Link 
            to="/assessment"
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3 justify-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span>Take New Assessment</span>
          </Link>
          <Link 
            to="/history"
            className="group bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3 justify-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
            </svg>
            <span>Back to History</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
