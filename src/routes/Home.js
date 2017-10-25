import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Redirect} from 'react-router-dom';
import Users from '../services/User.service';
import Lists from '../services/List.service';
import GiftList from '../components/GiftList';
import Select from 'material-ui/Select';
import {FormControl} from 'material-ui/Form';
import {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    padding: '16px'
  },
  listSelect: {
    width: '120px',
    'margin-right': '8px',
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.Users = Users;
    this.Lists = Lists;
    this.state = {
      user: {},
      userId: this.props.match.params.id ? this.props.match.params.id : '1',
      lists: [],
      selectedListId: ''
    };
  }

  componentDidMount() {
    // TODO figure out logged in user
    // const userId = this.props.match.params.id ? this.props.match.params.id : '1';
    this.Users.getUser(this.state.userId).then(response => {
      this.setState({user: response});
    });

    this.Lists.getUserLists(this.state.userId).then(response => {
      const state = {lists: response};
      state.selectedListId = response.find(list => {
        return list.name === 'default';
      }).id;
      this.setState(state);
    });
  }

  render() {
    const lists = this.state.lists.map(list => {
      return (<MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>);
    });
    const classes = this.props.classes;

    return (
      <div>
        <div className={classes.container}>
          <h3>My Lists</h3>
          <FormControl className className={classes.listSelect}>
            <Select value={this.state.selectedListId}>
              {lists}
            </Select>
          </FormControl>
          <Button raised color="primary" onClick={this.handleCreateList}>Create New List</Button>
        </div>
        <GiftList userId={this.state.userId} />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
