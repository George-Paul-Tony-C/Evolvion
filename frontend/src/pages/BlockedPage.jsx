import React, { useState } from 'react';
import { submitSorryRequest } from '../api/authApi';

// Animated Sorry Icon Component
const AnimatedSorryIcon = () => (
  <div className="relative w-24 h-24 mx-auto mb-6">
    {/* Outer Ring with Pulse */}
    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 rounded-full animate-pulse opacity-20"></div>
    <div className="absolute inset-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-full animate-bounce opacity-30"></div>
    
    {/* Main Icon Container */}
    <div className="absolute inset-4 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg animate-wobble">
      <svg className="w-8 h-8 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    </div>
    
    {/* Floating Particles */}
    <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-400 rounded-full animate-float opacity-60"></div>
    <div className="absolute -top-2 -right-2 w-2 h-2 bg-rose-400 rounded-full animate-float-delayed opacity-60"></div>
    <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-red-300 rounded-full animate-float-slow opacity-60"></div>
  </div>
);

// Reflection Steps Component
const ReflectionSteps = () => {
  const steps = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Acknowledge",
      description: "Recognize the policy violation"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      ),
      title: "Reflect",
      description: "Understand the importance of integrity"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
      ),
      title: "Commit",
      description: "Promise to maintain academic honesty"
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-slate-700 mb-4 text-center">Path to Redemption</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <div 
            key={step.title}
            className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-2xl border border-slate-200 text-center animate-fadeInUp hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              {step.icon}
            </div>
            <h4 className="font-semibold text-slate-800 mb-1">{step.title}</h4>
            <p className="text-sm text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function BlockedPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await submitSorryRequest(message);
      if (response.data.success) {
        setSuccess("Your request has been submitted successfully. An administrator will review it shortly.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-slate-50 flex flex-col justify-center items-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 transform rotate-12 scale-150"></div>
      </div>
      
      <div className="relative max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
          {/* Animated Sorry Icon */}
          <AnimatedSorryIcon />
          
          {/* Header */}
          <div className="text-center mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-700 bg-clip-text text-transparent mb-4">
              Account Temporarily Blocked
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-rose-600 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
              Your account has been temporarily suspended due to a violation of our assessment integrity policy.
            </p>
          </div>

          {/* Policy Violation Notice */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 p-6 rounded-2xl mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-2">Assessment Integrity Violation Detected</h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  Our monitoring system detected activities that violate our assessment policies. 
                  This includes but is not limited to: tab switching, using external resources, 
                  or attempting to cheat during assessments.
                </p>
              </div>
            </div>
          </div>

          {/* Reflection Steps */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <ReflectionSteps />
          </div>

          {/* Success State */}
          {success ? (
            <div className="text-center animate-fadeInUp">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg animate-bounce">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Request Submitted Successfully</h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <p className="text-green-700 leading-relaxed">{success}</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
                  <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  </svg>
                  <span>Under administrative review...</span>
                </div>
              </div>
            </div>
          ) : (
            /* Request Form */
            <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 mb-6">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
                  </svg>
                  Request Account Review
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  If you believe this action was taken in error, or if you'd like to appeal this decision, 
                  please provide a detailed explanation below. Be honest and show that you understand 
                  the importance of academic integrity.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="message" className="block text-left font-semibold text-slate-700 mb-3">
                    Your Message to the Administrator:
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                    placeholder="I understand that I violated the assessment policy by... I sincerely apologize and commit to maintaining academic integrity in the future..."
                    required
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Be honest, acknowledge your mistake, and show your commitment to integrity.
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-4 animate-fadeInUp">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      </svg>
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                      <span>Submit Appeal Request</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Footer Message */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-slate-500 leading-relaxed">
              We believe in second chances and learning from mistakes. 
              <br />
              <span className="font-medium text-slate-600">Academic integrity is the foundation of meaningful learning.</span>
            </p>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-red-400 to-rose-500 rounded-full opacity-10 animate-float"></div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-10 animate-float-delayed"></div>
      </div>
    </div>
  );
}
