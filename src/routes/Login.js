import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({

});

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
