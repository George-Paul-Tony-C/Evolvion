import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Fixed Navbar */}
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      {/* Main Layout Container */}
      <div className="flex pt-20"> {/* pt-20 to account for fixed navbar */}
        {/* Fixed Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ease-out ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}>
          <main className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden animate-fadeIn"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
