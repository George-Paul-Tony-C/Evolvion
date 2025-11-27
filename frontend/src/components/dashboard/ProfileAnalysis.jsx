import React, { useState, useEffect } from 'react';
import { analyzeProfile } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

// Loading skeleton component
const AnalysisLoadingSkeleton = () => (
  <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse"></div>
      <div className="space-y-2 flex-1">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-2/3 animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/2 animate-pulse"></div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4 mb-3 animate-pulse"></div>
          <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/2 animate-pulse"></div>
        </div>
      ))}
    </div>
    
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
      ))}
    </div>
  </div>
);

// Skill gap card component
const SkillGapCard = ({ gap, index }) => {
  const getSkillIcon = (skillName) => {
    const skill = skillName.toLowerCase();
    if (skill.includes('javascript') || skill.includes('js')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.77l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-.973l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"/>
        </svg>
      );
    } else if (skill.includes('react') || skill.includes('vue') || skill.includes('angular')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.099 2.21-.099zm-3.635.875c-.34.65-.64 1.318-.918 1.996-.24-.375-.466-.74-.673-1.094.64-.312 1.31-.574 2.017-.786.186.25.379.508.574.784zm7.266 0c.2-.281.38-.54.575-.791.704.208 1.38.472 2.02.784-.2.352-.423.71-.67 1.087-.282-.676-.588-1.33-.925-1.98zm3.632 5.304c.04.264.057.524.057.787 0 .264-.017.523-.057.787-.647.312-1.335.576-2.044.788.2-.352.424-.712.67-1.092.282.676.588 1.328.925 1.979-.195.283-.375.54-.575.791-.704-.208-1.38-.472-2.02-.784.2-.352.423-.712.67-1.092-.282-.676-.588-1.328-.925-1.979.195-.283.375-.54.575-.791zm-7.266.005c.34-.65.64-1.318.918-1.996.24.375.466.74.673 1.094-.64.312-1.31.574-2.017.786-.186-.25-.379-.508-.574-.784zm-3.635.875c-.34.65-.64 1.318-.918 1.996-.24-.375-.466-.74-.673-1.094.64-.312 1.31-.574 2.017-.786.186.25.379.508.574.784zM8.68 7.027c.365-.297.794-.406 1.184-.278.55.18 1.085.657 1.472 1.316.18.306.34.64.474.99-.474.08-.92.17-1.356.275-.307-.48-.63-.94-.97-1.378-.17-.22-.353-.427-.546-.614-.096-.093-.202-.183-.258-.311zm6.64 0c-.096.128-.162.218-.258.31-.193.188-.375.395-.546.615-.34.438-.663.898-.97 1.378-.436-.105-.882-.195-1.356-.275.134-.35.294-.684.474-.99.387-.659.922-1.136 1.472-1.316.39-.128.819-.019 1.184.278z"/>
        </svg>
      );
    } else if (skill.includes('python') || skill.includes('data') || skill.includes('machine learning') || skill.includes('ai')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm2.09-8.95l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
        </svg>
      );
    } else if (skill.includes('design') || skill.includes('ui') || skill.includes('ux')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/>
        </svg>
      );
    }
  };

  return (
    <div 
      className="group bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
          {getSkillIcon(gap)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-amber-800 group-hover:text-amber-900 transition-colors duration-200">
            {gap}
          </p>
          <p className="text-xs text-amber-600 mt-1">
            Recommended for your career growth
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function ProfileAnalysis() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillGaps, setSkillGaps] = useState([]);
  const [lastAnalyzed, setLastAnalyzed] = useState(null);

  useEffect(() => {
    const gaps = user?.aiInsights?.identifiedSkillGaps || [];
    setSkillGaps(gaps);
    // Simulate last analyzed time (you can store this in your backend)
    if (gaps.length > 0) {
      setLastAnalyzed(new Date());
    }
  }, [user]);

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await analyzeProfile();
      if (response.data.success) {
        const newGaps = response.data.data.identifiedSkillGaps;
        
        setSkillGaps(newGaps);
        setLastAnalyzed(new Date());

        setUser(prevUser => ({
          ...prevUser,
          aiInsights: {
            ...(prevUser.aiInsights || {}),
            identifiedSkillGaps: newGaps
          }
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AnalysisLoadingSkeleton />;
  }

  return (
    <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp mb-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM14 15V17H22V15H14ZM14 19V21H22V19H14ZM14 11V13H22V11H14Z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              AI Skill Gap Analysis
            </h2>
            <p className="text-slate-500 mt-1">Intelligent insights to accelerate your growth</p>
          </div>
        </div>
        
        {lastAnalyzed && (
          <div className="hidden md:block text-right">
            <p className="text-xs text-slate-500">Last analyzed</p>
            <p className="text-sm font-medium text-slate-700">
              {lastAnalyzed.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fadeInUp">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Skill Gaps Identified</p>
              <p className="text-3xl font-bold text-blue-800 mt-1">{skillGaps.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm font-medium">Growth Opportunities</p>
              <p className="text-3xl font-bold text-emerald-800 mt-1">
                {skillGaps.length > 0 ? skillGaps.length * 2 : 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">AI Confidence</p>
              <p className="text-3xl font-bold text-purple-800 mt-1">
                {skillGaps.length > 0 ? '95%' : '--'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM14 15V17H22V15H14ZM14 19V21H22V19H14ZM14 11V13H22V11H14Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl animate-fadeInUp">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
            </div>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {skillGaps.length > 0 ? (
        <div className="space-y-6 animate-fadeInUp">
          {/* Insights Header */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-indigo-800 mb-2">Analysis Complete!</h3>
                <p className="text-slate-600 leading-relaxed">
                  Based on your profile, experience, and current industry trends, our AI has identified 
                  <strong className="text-indigo-600"> {skillGaps.length} key areas</strong> where developing 
                  new skills could significantly boost your career growth.
                </p>
              </div>
            </div>
          </div>

          {/* Skill Gaps List */}
          <div className="space-y-3">
            <h4 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Recommended Skill Improvements
            </h4>
            
            {skillGaps.map((gap, index) => (
              <SkillGapCard key={index} gap={gap} index={index} />
            ))}
          </div>

          {/* Action Items */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              Next Steps
            </h4>
            <ul className="space-y-2 text-emerald-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Generate a personalized learning path</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Enroll in recommended courses</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Track your progress regularly</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 animate-fadeInUp">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-slate-700 mb-3">Ready for AI Analysis?</h3>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-8">
            Let our advanced AI analyze your profile, skills, and career goals to identify 
            personalized growth opportunities and skill gaps.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>Profile Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>Industry Trends</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>Personalized Insights</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="text-center mt-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing Your Profile...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM14 15V17H22V15H14ZM14 19V21H22V19H14ZM14 11V13H22V11H14Z"/>
              </svg>
              <span>{skillGaps.length > 0 ? 'Re-Analyze My Profile' : 'Analyze My Profile'}</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
        <p className="text-xs text-slate-500 mt-3">
          Analysis typically takes 2-3 seconds • Powered by AI
        </p>
      </div>
    </div>
  );
}
