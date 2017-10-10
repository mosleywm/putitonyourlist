module.exports = {
  getUsers: function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(AllUsers);
      }, 1000);
    });
  },
  getUser: function(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve (AllUsers.filter(user => {
          return user.id === id;
        }));
      })
    });
  }
}

const AllUsers = [
  {
    id: '1',
    name: 'Will Mosley'
  }, {
    id: '2',
    name: 'Keegan Mosley'
  }
];
