import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext'; // Import the custom hook
import LoadingSpinner from './components/LoadingSpinner';
const Check = () => {
  const { isAuthenticated, loading } = useAuthContext(); // Get authentication status and loading state

  useEffect(() => {
    // This will trigger a re-render when the auth state is loaded
  }, [isAuthenticated, loading]);

  if (loading) {
    return <LoadingSpinner/>; // Show a loading message while auth state is being checked
  }

  // If authenticated, redirect to HomePage, otherwise redirect to Home
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/home" />;
};

export default Check;
