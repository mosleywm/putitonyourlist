// import * as firebase from 'firebase';
const firebase = require('firebase');

module.exports = {
  getUserLists: function(userId) {
    return firebase.database().ref('lists').orderByChild('userId').equalTo(userId).once('value').then(response => {
      return response.val().filter(item => {
        return item !== null;
      });
    });
  },
  updateList: function(list) {
    return firebase.database().ref('lists')
  }
}

const ALL_LISTS = [
  {
    id: '1',
    userId: '1',
    listItems: [
      {
        id: '1',
        name: 'Wii',
        description: '',
        priority: false
      }, {
        id: '2',
        name: 'BotW',
        description: '',
        priority: false
      }, {
        id: '3',
        name: 'MarioKart',
        description: '',
        priority: false
      }
    ]
  }, {
    id: '2',
    userId: '2',
    listItems: [
      {
        id: '4',
        name: 'Skateboard',
        description: '',
        priority: false
      }, {
        id: '5',
        name: 'Snowboard',
        description: '',
        priority: false
      }, {
        id: '6',
        name: 'Rollerblades',
        description: '',
        priority: false
      }
    ]
  }
];
