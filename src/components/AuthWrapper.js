import React from 'react';
import firebase from 'firebase';

const AuthWrapper = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthState: false
      };
    }

    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        // TODO handle user info
        let isLoggedIn = false;
        if(user) {
          isLoggedIn = true;
        }
        this.setState({
          isLoggedIn: isLoggedIn,
          isAuthState: true
        });
      });
    }

    render() {
      return !this.state.isAuthState ? null : (
        <Component isLoggedIn={this.state.isLoggedIn} />
      );
    }
  }
}

export default AuthWrapper;
