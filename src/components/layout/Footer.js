import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  footer: {
    height: '60px',
    'background-color': '#80d0f2',
    'text-align': 'center'
  },
  footerContent: {
    'line-height': '60px',
    margin: 0
  }
});

function Footer(props) {
  const classes = props.classes;
  return (
    <footer className={classes.footer}>
      <p className={classes.footerContent}>&copy; 1999-2018 - Put It On Your List</p>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
