import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import * as AuthService from '../services/Auth.service';
import {Redirect} from 'react-router-dom';

const styles = theme => ({
  container: {
    margin: '50px auto',
    padding: '16px',
    'max-width': '480px',
    'min-width': '320px',
    'text-align': 'center'
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      password: '',
      confirmPassword: '',
      redirect: false
    };
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    AuthService.createUser(this.state.email, this.state.password);
  }

  render() {
    const classes = this.props.classes;
    return this.props.isLoggedIn ? (
      <Redirect to="/" />
    ) : (
      <form onSubmit={(event) => this.handleSubmit(event)} className={classes.container}>
        <Card>
          <CardHeader title="Sign Up" />
          <CardContent>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              value={this.props.firstName}
              onChange={(event) => {this.handleInput(event)}}
              margin="normal"
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={this.props.lastName}
              onChange={(event) => {this.handleInput(event)}}
              margin="normal"
            />
            <TextField
              fullWidth
              name="birthday"
              label="Birthday"
              type="date"
              value={this.props.birthday}
              onChange={(event) => {this.handleInput(event)}}
              InputLabelProps={{shrink: true}}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={this.props.email}
              onChange={(event) => {this.handleInput(event)}}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={this.props.password}
              onChange={(event) => {this.handleInput(event)}}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              value={this.props.passwordConfirm}
              onChange={(event) => {this.handleInput(event)}}
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="raised"
              color="primary"
              type="submit">Sign Up
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default withStyles(styles)(SignUp);
