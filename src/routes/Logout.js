import React, {Component} from 'react';
import * as AuthService from '../services/auth.service';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false
    };
  }

  componentDidMount() {
    AuthService.logout().then(res => {
      this.setState({isLoggedOut: true});
    });
  }

  render() {
    return !this.state.isLoggedOut ? (
      <div>You are being logged out.</div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default Logout;
