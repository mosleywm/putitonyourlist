import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';

const styles = theme => ({
  container: {
    display: 'inline-block'
  },
  link: {
    color: theme.palette.primary.main,
    'text-transform': 'uppercase',
    'text-decoration': 'none',
    'font-size': theme.typography.button.fontSize,
    'font-weight': theme.typography.button.fontWeight,
    '&:hover': {
      color: theme.palette.primary.light
    }
  },
  'linkLight': {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: theme.palette.grey['300']
    }
  }
});

const CustomLink = props => {
  let classes = [props.classes.link];
  if(props.color === 'light') {
    classes.push(props.classes.linkLight);
  }

  return (
    <Typography className={props.classes.container} variant="body1">
      <Link className={classes.join(' ')} to={props.to}>{props.children}</Link>
    </Typography>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired
};

export default withStyles(styles)(CustomLink);
