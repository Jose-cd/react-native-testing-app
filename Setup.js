import React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAFl7KOnbBbtjBihIctr-ZP3EV3UZ7xYQI',
  authDomain: 'fb-rn-sl.firebaseapp.com',
  databaseURL: 'https://fb-rn-sl.firebaseio.com',
  projectId: 'fb-rn-sl',
  storageBucket: 'fb-rn-sl.appspot.com',
  messagingSenderId: '872607565967',
  appId: '1:872607565967:web:c3d85489868b9cc263c8fa',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, firestore};
export default function Setup() {
  return <App />;
}
