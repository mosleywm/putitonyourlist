import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Redirect} from 'react-router-dom';
import Users from '../services/User.service';
import GiftList from '../components/GiftList';

const styles = theme => ({

});

class Home extends Component {
  constructor(props) {
    super(props);
    this.Users = Users;
    this.state = {
      user: {},
      listItems: []
    };
  }

  componentDidMount() {
    this.Users.getUser(this.props.match.params.id).then(response => {
      this.setState({user: response});
    });
  }

  render() {
    return (
      <div>
        <h3>My List</h3>
        <GiftList userId={this.props.match.params.id} />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
