import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;