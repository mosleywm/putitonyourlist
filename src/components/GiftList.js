import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ListService from '../services/List.service';
import GiftDetailDialog from './GiftDetailDialog';
import List, {ListItem, ListItemSecondaryAction} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({

});

class GiftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      open: false,
      selectedIndex: ''
    };
    this.ListService = ListService;
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleAddItem() {
    this.setState(prevState => ({
      listItems: prevState.listItems.concat([{
        id: '',
        name: '',
        description: '',
        priority: false
      }])
    }));
  }

  handleRemoveItem(index) {
    // Without mutatin state...
    // const items = this.state.listItems.filter((item, i) => {
    //   return i !== index;
    // });
    this.state.listItems.splice(index, 1)
    this.setState({listItems: this.state.listItems});
  }

  handleCheck(index) {
    // Without mutating state...
    // const items = this.state.listItems.map((item, i) => {
    //   if(i === index) {
    //     item.priority = !item.priority;
    //   }
    //   return item;
    // });
    this.state.listItems[index].priority = !this.state.listItems[index].priority;
    this.setState({listItems: this.state.listItems});
  }

  handleNameChange(index, e) {
    this.state.listItems[index].name = e.target.value;
    this.setState({listItems: this.state.listItems});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Update gifts');
  }

  handleItemEdit(index) {
    this.setState({
      open: true,
      selectedIndex: index
    });
  }

  handleRequestClose(item) {
    const state = {open: false};
    if(item) {
      this.state.listItems[this.state.selectedIndex] = item;
      state.listItems = this.state.listItems;
    }
    this.setState(state);
  }

  componentDidMount() {
    this.ListService.getUserList(this.props.userId).then(response => {
      this.setState({listItems: response[0].listItems});
    });
  }

  render() {
    const gifts = this.state.listItems.map((gift, i) => {
      return (
        <ListItem key={i}>
          <TextField
            required
            name="name"
            placeholder="Item"
            value={gift.name}
            margin="dense"
            fullWidth
            onChange={this.handleNameChange.bind(this, i)} />
          <Checkbox checked={gift.priority} onChange={this.handleCheck.bind(this, i)} />
          <IconButton onClick={this.handleItemEdit.bind(this, i)}><ModeEditIcon /></IconButton>
          <IconButton onClick={this.handleRemoveItem.bind(this, i)}><DeleteIcon /></IconButton>
        </ListItem>
      );
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Button raised color="accent" type="button" onClick={this.handleAddItem}>Add</Button>
          <List dense={true}>
            {gifts}
          </List>
          <Button raised color="primary" type="submit">Update</Button>
        </form>
        <GiftDetailDialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          item={this.state.listItems[this.state.selectedIndex]} />
      </div>
    );
  }
}

export default withStyles(styles)(GiftList);
