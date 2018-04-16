import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Redirect} from 'react-router-dom';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import CustomLink from '../components/elements/CustomLink';
import * as AuthService from '../services/Auth.service';

const styles = theme => ({
  container: {
    margin: '100px auto',
    width: '90%',
    'max-width': '400px',
    'text-align': 'center'
  },
  header: {
    color: theme.palette.grey[600]
  },
  actionContainer: {
    display: 'flex',
    'flex-direction': 'column'
  },
  action: {
    'margin-bottom': '8px'
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false
    };
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    AuthService.signIn(this.state.email, this.state.password);
  }

  render() {
    const classes = this.props.classes;
    const redirect = (<Redirect to="/" />);
    const form = (
      <form
        className={classes.container}
        onSubmit={(event) => this.handleSubmit(event)}>
        <Card>
          <CardHeader classes={{title: classes.header}} title="Login" />
          <CardContent>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={this.state.email}
              onChange={(event) => this.handleInput(event)}
              fullWidth
              margin="dense"
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={(event) => this.handleInput(event)}
              fullWidth
              margin="normal"
            />
          </CardContent>
          <CardActions classes={{root: classes.actionContainer, action: classes.action}}>
            <Button
              variant="raised"
              color="primary"
              type="submit"
              disableRipple={true}
              fullWidth={true}
              >Login
            </Button>
            <CustomLink to="/signup">Sign Up</CustomLink>
          </CardActions>
        </Card>
      </form>
    );

    return this.props.isLoggedIn ? redirect : form;
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
