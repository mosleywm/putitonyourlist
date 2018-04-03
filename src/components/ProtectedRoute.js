import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

class ProtectedRoute extends Component {
  render () {
    return !this.props.isLoggedIn ? (
      <Route exact path={this.props.path} component={this.props.component} />
    ) : (
      <Redirect to="/login" />
    );
  }
}

ProtectedRoute.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired
};

export default ProtectedRoute;
