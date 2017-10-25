import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBMqKeS7YCUl-Ze_jYEp9QhDEJfxvajJ1I",
  authDomain: "putitonyourlist.firebaseapp.com",
  databaseURL: "https://putitonyourlist.firebaseio.com",
  projectId: "putitonyourlist",
  storageBucket: "putitonyourlist.appspot.com",
  messagingSenderId: "613969521910"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
