import React from 'react';
import { Route, Redirect, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  // Replace the following logic with your actual role-checking mechanism
  const isManager = /* Check if the user is a manager */ true;
    const navigate=useNavigate();
  return (
    <Route
      {...rest}
      render={(props) =>
        isManager ? (
          <Component {...props} />
        ) : (
          navigate('/')
        )
      }
    />
  );
};

export default PrivateRoute;
