// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext"; // Correct import

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuthContext(); // Access currentUser from AuthContext

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
