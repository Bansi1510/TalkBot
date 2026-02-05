import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useContext(UserContext)!;

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
