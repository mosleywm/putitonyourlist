import firebase from 'firebase';

const createList = list => {
  const newKey = firebase.database().ref().child('lists').push().key;
  list.id = newKey;
  return firebase.database().ref().child('lists').update({['/' + newKey]: list}).then(() => list);
};

const getUserLists = userId => {
  return firebase.database().ref('lists').orderByChild('userId').equalTo(userId).once('value').then(response => {
    const lists = [];
    // parse firebase object response to normal array return
    if(response.hasChildren) {
      response.forEach(list => {lists.push(list.val());});
    }
    return lists;
  });
}

const updateList = list => {
  return firebase.database().ref('lists');
}

export {createList, getUserLists, updateList};
