import React from 'react';
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
import AuthWrapper from './components/Auth/AuthWrapper';

const styles = theme => ({
  container: {
    'max-width': '980px',
    margin: 'auto'
  }
});

function App(props) {
  const classes = props.classes;
  return (
    <Router>
      <div>
        <Header isLoggedIn={props.isLoggedIn} />
        <div className={classes.container}>
          <Route path='/login' component={() => <Login isLoggedIn={props.isLoggedIn} />} />
          <Route path='/signup' component={() => <SignUp isLoggedIn={props.isLoggedIn} />} />
          <Route path="/logout" component={() => <Logout isLoggedIn={props.isLoggedIn} />} />
          <ProtectedRoute exact path='/' component={Home} isLoggedIn={props.isLoggedIn} />
          <ProtectedRoute path='/lists/:id' component={Home} isLoggedIn={props.isLoggedIn} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default AuthWrapper(withStyles(styles)(App));
