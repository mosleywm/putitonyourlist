import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Logout from './routes/Logout';
import Home from './routes/Home';
import Profile from './routes/Profile';
import AuthWrapper from './components/AuthWrapper';

const styles = theme => ({
  container: {
    'max-width': '980px',
    margin: 'auto'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;
    return (
      <Router>
        <div>
          <Header />
          <div className={classes.container}>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={SignUp} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute exact path='/' component={Home} isLoggedIn={this.props.isLoggedIn} />
            <ProtectedRoute path='/lists/:id' component={Home} isLoggedIn={this.props.isLoggedIn} />
            <ProtectedRoute path='/profile' component={Profile} isLoggedIn={this.props.isLoggedIn} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default AuthWrapper(withStyles(styles)(App));
