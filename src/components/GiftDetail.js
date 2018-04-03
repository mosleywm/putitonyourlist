import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import Input from 'material-ui/Input';

const styles = theme => ({
  cardContentContainer: {
    display: 'flex',
    'align-items': 'stretch'
  },
  flexStretch: {
    'flex-grow': 1
  },
  // TODO: should be a core style
  secondaryButton: {
    'min-width': 'auto',
    'border-radius': 0
  }
});

const GiftDetail = (props) => (
  <Card className={props.classes.cardContentContainer}>
    <CardContent className={props.classes.flexStretch}>
      <TextField
        required
        name="name"
        placeholder="Item"
        value={props.gift.name}
        margin="dense"
        fullWidth
        onChange={(e) => props.handleInputChange(props.index, e)} />
      <FormControlLabel
        control={
          <Checkbox
            name="priority"
            checked={props.gift.priority}
            onChange={(e) => props.handleCheck(props.index, e)} />
        }
        label="This gift is a priority" />
      <TextField
        fullWidth
        multiline
        rowsMax="3"
        name="description"
        placeholder="Description..."
        value={props.gift.description}
        onChange={(e) => props.handleInputChange(props.index, e)} />
    </CardContent>
    <div className={props.classes.cardContentContainer}>
      <Button raised color="secondary" className={props.classes.secondaryButton} onClick={() => props.handleRemoveItem(props.index)}>
        <DeleteIcon />
      </Button>
    </div>
  </Card>
);

GiftDetail.propTypes = {
  gift: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired
};

export default withStyles(styles)(GiftDetail);
