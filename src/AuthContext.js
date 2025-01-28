// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";  // Assuming Firebase is correctly initialized
import { onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from "./components/LoadingSpinner";
// Creating the context to share the authentication state
const AuthContext = createContext();

// Custom hook to access authentication context
export const useAuthContext = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide the currentUser
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);  // State to handle loading while checking auth status

  useEffect(() => {
    // Firebase's onAuthStateChanged will be triggered when the user's auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);  // Set the current user if authenticated
      setLoading(false);      // Set loading to false after authentication state has been checked
    });

    return () => unsubscribe();  // Cleanup subscription when the component unmounts
  }, []);

  // While loading, we show a loading state (e.g., spinner or loading text)
  if (loading) {
    return <LoadingSpinner/>;
  }

  // Deriving `isAuthenticated` based on the `currentUser`
  const isAuthenticated = currentUser !== null;

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated }}>
      {children}  {/* Render the children components once user auth state is available */}
    </AuthContext.Provider>
  );
};
