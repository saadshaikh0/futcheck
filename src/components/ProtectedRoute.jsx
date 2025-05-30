import React from "react";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, showLogin } = useAuth();
  if (!user) {
    showLogin();
    return null;
  }
  return children;
}; 

export default ProtectedRoute;
