import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Dialog, {DialogActions, DialogTitle, DialogContent} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {FormControl, FormControlLabel} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Lists from '../services/List.service';
import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({
  smallIcon: {
    'font-size': '.75em'
  }
});

class ListDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    this.Lists = Lists;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePublicSelect = this.handlePublicSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handlePublicSelect() {
    this.setState(prevState => ({isPublic: !prevState.isPublic}));
  }

  handleClose(shouldSave, e) {
    e.preventDefault();
    const list = Object.assign({userId: this.props.userid}, this.state);
    if(shouldSave) {
      this.Lists.createList(list).then(list => {
        this.props.onRequestClose(list);
        this.clearState();
      });
      return;
    }
    this.props.onRequestClose(false);
    this.clearState();
  }

  clearState() {
    this.setState({
      name: '',
      description: ''
    });
  }

  render() {
    const {classes, ...other} = this.props;

    return (
      <Dialog {...other} ignoreBackdropClick={true}>
        <form onSubmit={this.handleClose.bind(this, true)}>
          <DialogTitle>Create New List</DialogTitle>
          <DialogContent>
            <FormControlLabel
              control={
                <Checkbox
                  name="isPublic"
                  checked={this.state.isPublic}
                  onChange={this.handlePublicSelect} />
              }
              label="Share this list" />
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                placeholder="Item"
                value={this.state.name}
                onChange={this.handleInputChange} />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                multiline
                rows="3"
                name="description"
                placeholder="Description..."
                value={this.state.description}
                onChange={this.handleInputChange} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button raised color="accent" onClick={this.handleClose.bind(this, false)}>Cancel</Button>
            <Button raised color="primary" type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ListDialog);