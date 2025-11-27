import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50' 
        : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600'
    }`}>
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="relative px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand with Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                isScrolled 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Toggle sidebar"
            >
              <svg className={`w-5 h-5 transition-transform duration-300 ${
                isSidebarOpen ? 'rotate-0' : 'rotate-180'
              }`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                : 'bg-white/20 text-white'
            }`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className={`transition-all duration-300 ${
              isScrolled ? 'text-slate-800' : 'text-white'
            }`}>
              <h1 className="text-xl font-bold">HexaPath SkillUp</h1>
              <p className={`text-xs ${
                isScrolled ? 'text-slate-500' : 'text-blue-100'
              }`}>
                Learning Management System
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <div className={`flex items-center gap-4 px-4 py-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-slate-50 text-slate-600' 
                : 'bg-white/10 text-white'
            }`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
              </svg>
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
            
            <div className={`w-px h-6 ${
              isScrolled ? 'bg-slate-300' : 'bg-white/20'
            }`}></div>
            
            <div className={`flex items-center gap-2 transition-all duration-300 ${
              isScrolled ? 'text-slate-600' : 'text-white'
            }`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium">Welcome, {user?.name}</span>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className={`relative p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              isScrolled 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5-5-5 5h5zm0 0v6"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
            </button>

            {/* Settings */}
            <Link to='/settings' className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              isScrolled 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </Link>

            {/* Logout Button */}
            <button
              onClick={logout}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg' 
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
