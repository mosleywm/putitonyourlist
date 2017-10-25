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
  container: {
    'margin-bottom': '20px'
  },
  buttonOffset: {
    margin: '0 16px'
  }
});

class GiftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifts: [],
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
      gifts: prevState.gifts.concat([{
        id: '',
        name: '',
        description: '',
        priority: false
      }])
    }));
  }

  handleRemoveItem(index) {
    // Without mutating state...
    // const items = this.state.gifts.filter((item, i) => {
    //   return i !== index;
    // });
    this.state.gifts.splice(index, 1)
    this.setState({gifts: this.state.gifts});
  }

  handleCheck(index) {
    // Without mutating state...
    // const items = this.state.gifts.map((item, i) => {
    //   if(i === index) {
    //     item.priority = !item.priority;
    //   }
    //   return item;
    // });
    this.state.gifts[index].priority = !this.state.gifts[index].priority;
    this.setState({gifts: this.state.gifts});
  }

  handleNameChange(index, e) {
    this.state.gifts[index].name = e.target.value;
    this.setState({gifts: this.state.gifts});
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
      this.state.gifts[this.state.selectedIndex] = item;
      state.gifts = this.state.gifts;
    }
    this.setState(state);
  }

  componentDidMount() {
    this.ListService.getUserLists(this.props.userId).then(response => {
      if(response.length < 3) {
        this.handleAddItem()
      } else {
        this.setState({gifts: response[0].gifts});
      }
    });
  }

  render() {
    const classes = this.props.classes;
    const gifts = this.state.gifts.map((gift, i) => {
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
      <div className={classes.container}>
        <form onSubmit={this.handleSubmit}>
          <Button className={classes.buttonOffset} raised color="accent" type="button" onClick={this.handleAddItem}>Add Item</Button>
          <List dense={true}>
            {gifts}
          </List>
          <Button className={classes.buttonOffset} raised color="primary" type="submit" onClick={this.handleUpdateItems}>Update</Button>
        </form>
        <GiftDetailDialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          item={this.state.gifts[this.state.selectedIndex]} />
      </div>
    );
  }
}

export default withStyles(styles)(GiftList);
