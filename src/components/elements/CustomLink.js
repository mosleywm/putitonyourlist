import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';

const styles = theme => ({
  link: {
    color: theme.palette.primary.main,
    'text-transform': 'uppercase',
    'text-decoration': 'none',
    'font-size': theme.typography.button.fontSize,
    'font-weight': theme.typography.button.fontWeight
  },
  '&:hover': {
    color: theme.palette.primary.dark
  }
});

const CustomLink = props => (
  <Typography variant="body1">
    <Link className={props.classes.link} to={props.to}>{props.children}</Link>
  </Typography>
);

CustomLink.propTypes = {
  to: PropTypes.string.isRequired
};

export default withStyles(styles)(CustomLink);
