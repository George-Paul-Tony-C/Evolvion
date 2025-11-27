import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  login as apiLogin, 
  register as apiRegister, 
  getCurrentUser as apiGetCurrentUser 
} from '../api/authApi';
import BlockedPage from '../pages/BlockedPage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await apiGetCurrentUser();
        // Check the 'success' boolean field from our standard ApiResponse
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (err) {
        console.log("No active session found.");
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (user && user.status === 'blocked') {
    return <BlockedPage />;
  }

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(credentials);
      if (response.data.success) {
        setUser(response.data.data);
      }
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred during login.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRegister(userData);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred during registration.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // We will add a server call here later
    setUser(null);
    // We also need to clear the cookies, which is best done by the server
  };


  const authValue = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading Application...</h2>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
