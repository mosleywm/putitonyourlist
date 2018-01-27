import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Redirect} from 'react-router-dom';
import Users from '../services/User.service';
import Lists from '../services/List.service';
import GiftList from '../components/GiftList';
import ListDialog from '../components/ListDialog';
import Select from 'material-ui/Select';
import {FormControl} from 'material-ui/Form';
import {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  container: {
    padding: '16px'
  },
  listSelect: {
    width: '120px',
    'margin-right': '8px',
  },
  warningWell: {
    'background-color': '#eeeeee',
    padding: '16px'
  },
  sectionSmall: {
    'margin-bottom': '20px'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userId: this.props.match.params.id ? this.props.match.params.id : '1',
      lists: null,
      selectedList: {id: ''},
      open: false
    };
    this.Users = Users;
    this.Lists = Lists;
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
  }

  handleRequestClose(list) {
    const state = {open: false};
    if(list) {
      state.lists = this.state.lists.concat([list]);
      state.selectedList = list;
      this.setState(state);
      return;
    }
    this.setState(state);
  }

  handleCreateList() {
    this.setState({open: true});
  }

  handleListSelect(e) {
    const selectedList = this.state.lists.find(list => {
      return list.id === e.target.value;
    });
    this.setState({selectedList: selectedList});
  }

  componentDidMount() {
    // TODO figure out logged in user
    // const userId = this.props.match.params.id ? this.props.match.params.id : '1';
    this.Users.getUser(this.state.userId).then(response => {
      this.setState({user: response});
    });

    this.Lists.getUserLists(this.state.userId).then(response => {
      const state = {lists: response};
      state.selectedList = response.find(list => {
        return list.isPublic;
      });
      state.selectedList = state.selectedList ? state.selectedList : response[0];
      this.setState(state);
    });
  }

  render() {
    const classes = this.props.classes;
    let content = '';

    if(this.state.lists) {
      content = (
        <div className={classes.warningWell}>
          <div className={classes.sectionSmall}>Please create a gift list!</div>
          <Button color="primary" onClick={this.handleCreateList}><Icon color="primary">add</Icon>Create New List</Button>
        </div>
      );
    }

    if(this.state.lists && this.state.lists.length > 0) {
      const lists = this.state.lists.map(list => {
        return (<MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>);
      });

      content = (
        <div>
          <FormControl className={classes.listSelect}>
            <Select value={this.state.selectedList.id} onChange={this.handleListSelect}>
              {lists}
            </Select>
            </FormControl>
            <Button raised color="primary" onClick={this.handleCreateList}>Create New List</Button>
            <h2>{this.state.selectedList.name}</h2>
            <div className={classes.sectionSmall}>{this.state.selectedList.description}</div>
            <GiftList userId={this.state.userId} listId={this.state.selectedList.id} />
        </div>
      );
    }

    return (
      <div>
        <div className={classes.container}>
          <h3>My Lists</h3>
          {content}
          <ListDialog open={this.state.open} onRequestClose={this.handleRequestClose} userid={this.state.userId} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
