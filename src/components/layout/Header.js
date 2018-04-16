import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import CustomLink from '../elements/CustomLink';

const styles = theme => ({
  header: {
    height: '50px',
    'background-color': '#2780a6',
    'text-align': 'center',
    position: 'relative'
  },
  title: {
    display: 'inline-block',
    color: '#fafafa',
    margin: 0,
    'line-height': '50px'
  },
  logout: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(0,-50%)',
    'margin-right': '16px'
  }
});

function Header(props) {
  const classes = props.classes;
  return (
    <header className={classes.header}>
      <h2 className={classes.title}>Put It On Your List</h2>
      {props.isLoggedIn && (<div className={classes.logout}>
        <CustomLink className={classes.logout} color="light" to="/logout">Logout</CustomLink>
      </div>)}
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default withStyles(styles)(Header);
