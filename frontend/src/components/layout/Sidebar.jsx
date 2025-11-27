import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen }) {
  const { user } = useAuth();
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  // Employee-only links
  const employeeLinks = [
    { 
      to: "/dashboard", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      ), 
      text: "Dashboard",
      shortText: "D",
      hasNotification: false
    },
    { 
      to: "/profile", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ), 
      text: "My Profile",
      shortText: "P",
      hasNotification: false
    },
    { 
      to: "/history", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
        </svg>
      ), 
      text: "Assessment History",
      shortText: "A",
      hasNotification: false
    },
    { 
      to: "/courses", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ), 
      text: "Learning Paths",
      shortText: "L",
      hasNotification: false
    },
  ];

  // Admin-only links
  const adminLinks = [
    { 
      to: "/admin", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
      ), 
      text: "Admin Console",
      shortText: "A",
      hasNotification: false
    },
    { 
      to: "/admin/requests", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      ), 
      text: "Pending Requests",
      shortText: "P",
      hasNotification: true // This will have the blinking notification
    },
    { 
      to: "/analytics", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
        </svg>
      ), 
      text: "Analytics",
      shortText: "An",
      hasNotification: false
    },
  ];

  // Show only relevant links based on user role
  const links = user?.role === 'admin' ? adminLinks : employeeLinks;

  // Simulate fetching pending requests count for notification
  useEffect(() => {
    if (user?.role === 'admin') {
      // In real app, you'd fetch this from your API
      setPendingRequestsCount(0); // Mock count
    }
  }, [user]);

  return (
    <aside className={`fixed left-0 top-20 bottom-0 bg-white/95 backdrop-blur-lg border-r border-slate-200/50 shadow-xl z-40 transition-all duration-500 ease-out transform ${
      isOpen ? 'w-64 translate-x-0' : 'w-22 translate-x-0'
    }`}>
      {/* Sidebar Header */}
      <div className={`p-4 border-b border-slate-200/50 transition-all duration-500 ${
        isOpen ? 'px-6' : 'px-4'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
            user?.role === 'admin' ? 'from-blue-500 to-violet-600' : 'from-blue-500 to-blue-600'
          } flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300 hover:scale-110`}>
            {user?.role === 'admin' ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            )}
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${
            isOpen ? 'opacity-100 w-auto max-w-none' : 'opacity-0 w-0 max-w-0'
          }`}>
            <h2 className="font-bold text-slate-800 whitespace-nowrap">
              {user?.role === 'admin' ? 'Admin Panel' : 'Navigation'}
            </h2>
            <p className="text-xs text-slate-500 whitespace-nowrap">
              {user?.role === 'admin' ? 'System management' : 'Quick access'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {links.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 animate-fadeInUp relative overflow-hidden ${
                isActive 
                  ? `bg-gradient-to-r ${user?.role === 'admin' ? 'from-blue-500 to-violet-600' : 'from-blue-500 to-blue-600'} text-white shadow-lg` 
                  : 'hover:bg-slate-100 text-slate-700 hover:shadow-md'
              }`
            }
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon Container with Notification */}
            <div className="relative flex-shrink-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                ({ isActive }) => isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'
              }`}>
                {link.icon}
              </div>
              
              {/* Green Blinking Notification Dot */}
              {link.hasNotification && pendingRequestsCount > 0 && (
                <>
                  {/* Pulsing outer ring */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  {/* Static notification dot with count */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <span className="text-white text-xs font-bold">{pendingRequestsCount > 9 ? '9+' : pendingRequestsCount}</span>
                  </div>
                </>
              )}
              
              {/* General activity indicator for other links when active */}
              {!link.hasNotification && (
                <NavLink to={link.to}>
                  {({ isActive }) => 
                    isActive && (
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                    )
                  }
                </NavLink>
              )}
            </div>
            
            {/* Full Text - shown when sidebar is open */}
            <span className={`font-medium transition-all duration-500 overflow-hidden whitespace-nowrap ${
              isOpen ? 'opacity-100 w-auto max-w-none' : 'opacity-0 w-0 max-w-0'
            }`}>
              {link.text}
            </span>
            
            {/* Tooltip for collapsed state */}
            {!isOpen && (
              <div className="absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl transform scale-95 group-hover:scale-100">
                {link.text}
                {link.hasNotification && pendingRequestsCount > 0 && (
                  <span className="ml-2 bg-green-500 text-xs px-2 py-1 rounded-full">
                    {pendingRequestsCount}
                  </span>
                )}
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
              </div>
            )}
            
            {/* Active indicator arrow */}
            <div className={`ml-auto transition-all duration-500 ${
              isOpen ? 'opacity-100 w-auto max-w-none' : 'opacity-0 w-0 max-w-0'
            }`}>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>

            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </NavLink>
        ))}
      </nav>

      {/* User Role Badge */}
      <div className="p-4 border-t border-slate-200/50">
        <div className={`p-3 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl border border-slate-200 transition-all duration-500 hover:shadow-md ${
          isOpen ? '' : 'px-2'
        }`}>
          <div className="flex items-center gap-3">
            {/* Role Status Indicator with Green Blinking */}
            <div className="relative flex-shrink-0">
              <div className={`w-4 h-4 rounded-full ${
                user?.role === 'admin' ? 'bg-blue-500' : 'bg-blue-500'
              } flex items-center justify-center shadow-md`}>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              {/* Outer blinking ring */}
              <div className={`absolute inset-0 w-4 h-4 rounded-full ${
                user?.role === 'admin' ? 'bg-blue-400' : 'bg-blue-400'
              } animate-ping opacity-30`}></div>
            </div>

            {/* Role Text */}
            <div className={`transition-all duration-500 overflow-hidden ${
              isOpen ? 'opacity-100 w-auto max-w-none' : 'opacity-0 w-0 max-w-0'
            }`}>
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap block">
                {user?.role?.toUpperCase()} ACCESS
              </span>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {user?.role === 'admin' ? 'System Administrator' : 'Employee Portal'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Indicator (when collapsed) */}
      {!isOpen && (
        <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
          <div className="w-6 h-12 bg-white/90 backdrop-blur-sm rounded-r-lg border border-l-0 border-slate-200/50 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 cursor-pointer">
            <div className="flex flex-col space-y-1">
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
