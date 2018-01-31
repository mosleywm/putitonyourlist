import firebase from 'firebase';

const createGift = gift => {
  const Gifts = firebase.database().ref().child('gifts');
  const newKey = Gifts.push().key;
  const update = {};
  gift.id = newKey;
  update['/' + newKey] = gift;
  return Gifts.update(update).then(() => gift);
};

const getListGifts = listId => {
  return firebase.database().ref('gifts').orderByChild('listId').equalTo(listId).once('value').then(response => {
    const gifts = [];
    // parse firebase object response to normal array return
    if(response.hasChildren) {
      response.forEach(gift => {gifts.push(gift.val());});
    }
    return gifts;
  });
};

const updateGift = gift => {
  return firebase.database().ref('gifts/' + gift.id).update(gift).then(() => gift);
};

const deleteGift = gift => {
  return firebase.database().ref('gifts/' + gift.id).remove().then(() => gift);
};

export {createGift, getListGifts, updateGift, deleteGift};
