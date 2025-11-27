import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EmployeeRoute = () => {
  const { user } = useAuth();

  // If the user is an admin, render the child components (Outlet).
  // Otherwise, redirect them to their regular dashboard.
  return user?.role === 'employee' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default EmployeeRoute;
