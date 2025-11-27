import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ChatMessage({ message, index }) {
  const { user } = useAuth();
  const isUser = message.role === 'user';

  return (
    <div 
      className={`flex items-start gap-3 mb-4 animate-fadeInUp ${isUser ? 'justify-end' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {!isUser && (
        <div className="relative group flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM14 15V17H22V15H14ZM14 19V21H22V19H14ZM14 11V13H22V11H14Z"/>
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      )}
      
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-lg flex-shrink-0">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      )}

      <div className={`group relative max-w-xs md:max-w-md transition-shadow duration-300 ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl' 
            : 'bg-gradient-to-br from-white to-slate-50 text-slate-800 shadow-md hover:shadow-lg border border-slate-200'
        } rounded-2xl p-4 backdrop-blur-sm`}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        
        {/* Message timestamp - positioned to not interfere with layout */}
        <div className={`absolute -bottom-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
          isUser ? 'right-0 text-blue-400' : 'left-0 text-slate-400'
        }`}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* Decorative corner */}
        <div className={`absolute ${isUser ? '-left-2 top-4' : '-right-2 top-4'} w-4 h-4 transform rotate-45 ${
          isUser ? 'bg-blue-500' : 'bg-white border-r border-b border-slate-200'
        }`}></div>
      </div>
    </div>
  );
}
