// ProtectedRoute.js

import React from 'react';
import { Navigate, Redirect, Route } from 'react-router-dom';
import AuthService from './AuthService';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const userRole = AuthService.getRole();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          // Redirect to the login page if not authenticated
          return <Navigate replace to="/login" />;
        }

        // Check if the user's role is allowed for this route
        if (allowedRoles.includes(userRole)) {
          return <Component {...props} />;
        } else {
          // Redirect to a forbidden page if the user's role is not allowed
          return <Navigate replace to="/forbidden" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
