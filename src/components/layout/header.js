import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  header: {
    height: '50px',
    'background-color': '#2780a6',
    'text-align': 'center'
  },
  title: {
    display: 'inline-block',
    color: '#fafafa',
    margin: 0,
    'line-height': '50px'
  }
});

class Header extends Component {
  render() {
    const classes = this.props.classes;

    return (
      <header className={classes.header}>
        <h2 className={classes.title}>Put It On Your List</h2>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
