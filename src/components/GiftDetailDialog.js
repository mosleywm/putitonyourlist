import React, {Component} from 'react';
import Dialog, {DialogActions, DialogTitle, DialogContent} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class GiftDetailDialog extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnEnter = this.handleOnEnter.bind(this);
    this.state = {
      name: '',
      description: ''
    };
  }

  handleClose(shouldSave, e) {
    e.preventDefault();
    const item = shouldSave ? this.state : false;
    this.props.onRequestClose(item);
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleOnEnter() {
    this.setState(this.props.item);
  }

  render() {
    const {...other} = this.props;
    return (
      <Dialog {...other} ignoreBackdropClick={true} onEnter={this.handleOnEnter}>
        <form onSubmit={this.handleClose.bind(this, true)}>
          <DialogTitle>{this.state.name} Details</DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              name="name"
              placeholder="Item"
              value={this.state.name}
              onChange={this.handleInputChange} />
            <TextField
              fullWidth
              multiline
              rows="3"
              name="description"
              placeholder="Description..."
              value={this.state.description}
              onChange={this.handleInputChange} />
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

export default GiftDetailDialog;
