module.exports = {
  getLists: function() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(ALL_LISTS);
      }, 1000);
    });
  },
  getUserList: function(userId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(ALL_LISTS.filter(list => {
          return list.userId === userId;
        }));
      }, 1000);
    });
  },
  getList: function(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(ALL_LISTS.find(list => {
          return list.id === id;
        }));
      });
    });
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
