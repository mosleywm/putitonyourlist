import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import * as GiftService from '../services/Gift.service';
import GiftDetail from './GiftDetail';
import List from 'material-ui/List';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import _ from 'lodash';

const styles = theme => ({
  container: {
    'margin-bottom': '20px'
  },
  // TODO: should be a core style
  listContainer: {
    margin: '15px 0',
    '& div:not(:last-child)': {
      'margin-bottom': '15px'
    }
  },
  flushLeft: {
    'margin-left': 0,
    'padding-left': 0
  }
});

class GiftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifts: [],
      isUpdateDisabled: true,
      open: false,
      selectedIndex: ''
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getUpdateStatus = this.getUpdateStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNewGift = this.getNewGift.bind(this);
    this.getListGifts = this.getListGifts.bind(this);
  }

  handleAddItem() {
    this.setState(prevState => {
      prevState.gifts.unshift(this.getNewGift(this.props.listId));
      return {
        gifts: prevState.gifts,
        isUpdateDisabled: this.getUpdateStatus(prevState.gifts, prevState.savedGifts)
      };
    });
  }

  handleRemoveItem(index) {
    const gift = this.state.gifts[index];
    const promise = gift.id ? GiftService.deleteGift(this.state.gifts[index]) : Promise.resolve();
    promise.then(res => {
      this.setState(prevState => {
        prevState.gifts.splice(index, 1);
        return {
          gifts: prevState.gifts,
          isUpdateDisabled: this.getUpdateStatus(prevState.gifts, prevState.savedGifts)
        };
      });
    });
  }

  handleCheck(index) {
    this.setState(prevState => {
      prevState.gifts[index].priority = !prevState.gifts[index].priority;
      return {
        gifts: prevState.gifts,
        isUpdateDisabled: this.getUpdateStatus(prevState.gifts, prevState.savedGifts)
      };
    });
  }

  handleInputChange(index, e) {
    const val = e.target.value;
    const prop = e.target.name;
    this.setState((prevState) => {
      prevState.gifts[index][prop] = val;
      return {
        gifts: prevState.gifts,
        isUpdateDisabled: this.getUpdateStatus(prevState.gifts, prevState.savedGifts)
      };
    });
  }

  getUpdateStatus(gifts, savedGifts) {
    return _.isEqual(gifts, savedGifts) || gifts.length < 1;
  }

  handleSubmit(e) {
    e.preventDefault();
    const promises = [];
    this.state.gifts.forEach(gift => {
      let giftPromise = gift.id ? GiftService.updateGift(gift) : GiftService.createGift(gift);
      promises.push(giftPromise);
    });
    Promise.all(promises).then(response => {
      this.setState({
        gifts: response,
        savedGifts: this.copyState(response),
        isUpdateDisabled: true
      });
    });
  }

  getNewGift(listId) {
    return {
      id: '',
      name: '',
      description: '',
      priority: false,
      listId: listId
    };
  }

  getListGifts(listId) {
    GiftService.getListGifts(listId).then(response => {
      if(response.length < 1) {
        this.setState({
          gifts: [this.getNewGift(listId)],
          savedGifts: [this.getNewGift(listId)]
        });
      } else {
        this.setState({
          gifts: response,
          savedGifts: this.copyState(response)
        });
      }
    });
  }

  copyState(state) {
    return JSON.parse(JSON.stringify(state));
  }

  componentDidMount() {
    this.getListGifts(this.props.listId);
  }

  componentWillReceiveProps(nextProps) {
    this.getListGifts(nextProps.listId);
  }

  render() {
    const classes = this.props.classes;
    const gifts = this.state.gifts.map((gift, i) => {
      return (
        <GiftDetail
          key={i}
          gift={gift}
          index={i}
          handleCheck={this.handleCheck}
          handleInputChange={this.handleInputChange}
          handleRemoveItem={this.handleRemoveItem}
        />
      );
    });

    return (
      <div className={classes.container}>
        <form onSubmit={this.handleSubmit}>
          <Button raised type="button" onClick={this.handleAddItem}>
            <Icon className={classes.flushLeft}>add</Icon>Add Item
          </Button>
          <List className={classes.listContainer} dense={true}>
            {gifts}
          </List>
          <Button
            raised
            color="primary"
            type="submit"
            disabled={this.state.isUpdateDisabled}
            onClick={this.handleUpdateItems}>Update</Button>
        </form>
      </div>
    );
  }
}

GiftList.propTypes = {
  userId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired
};

export default withStyles(styles)(GiftList);
