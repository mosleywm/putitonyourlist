import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './routes/Login';
import Home from './routes/Home';
import Profile from './routes/Profile';

const styles = theme => ({
  container: {
    'max-width': '980px',
    margin: 'auto'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false}
  }

  render() {
    const classes = this.props.classes;
    return (
      <Router>
        <div>
          <Header />
            <div className={classes.container}>
              <ProtectedRoute path='' component={Home}/>
              <ProtectedRoute path='/:id' component={Home}/>
              <Route path='/login' component={Login}/>
              <ProtectedRoute path='/profile' component={Profile}/>
            </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
