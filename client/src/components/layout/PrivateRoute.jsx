// client/src/components/layout/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user's role is allowed
  if (roles.length > 0 && !roles.includes(user.role)) {
    // Redirect to home if user role is unauthorized for the route
    return <Navigate to="/" replace />;
  }

  // Authorized: render children components
  return children;
};

export default PrivateRoute;
