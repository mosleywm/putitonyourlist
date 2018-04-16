import React, {Component} from 'react';
import * as AuthService from '../services/Auth.service';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
  componentDidMount() {
    AuthService.logout();
  }

  render() {
    return this.props.isLoggedIn ? (
      <div>You are being logged out.</div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default Logout;
