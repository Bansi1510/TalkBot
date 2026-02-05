import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const RequireCustomization = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useContext(UserContext)!;

  if (loading) return null;

  if (!user?.assistantName || !user?.assistantImage) {
    return <Navigate to="/customize" replace />;
  }

  return children;
};

export default RequireCustomization;
