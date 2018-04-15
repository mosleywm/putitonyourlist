import firebase from 'firebase';

const signIn = (email, pass) => {
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(res => {
    return firebase.auth().signInWithEmailAndPassword(email, pass);
  });
}

const createUser = (email, pass) => {
  return firebase.auth().createUserWithEmailAndPassword(email, pass);
}

const logout = () => {
  return firebase.auth().signOut();
}

export {signIn, createUser, logout};
