import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.app.userInfo);
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
