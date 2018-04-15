import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest, isLoggedIn}) => (
  <Route
    {...rest}
    render={props => {
      return isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )}}
  />
);

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

export default ProtectedRoute;
