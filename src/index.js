import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_NAME + ".firebaseapp.com",
  databaseURL: "https://" + process.env.REACT_APP_FIREBASE_NAME + ".firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_NAME,
  storageBucket: process.env.REACT_APP_FIREBASE_NAME + ".appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
