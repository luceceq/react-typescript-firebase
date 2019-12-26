import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const API_KEY = 'AIzaSyA5POCEKadNrEkU8hhBeMMKluBTwJJXHBM';
const AUTH_DOMAIN = 'airvat-test.firebaseapp.com';
const DATABASE_URL = 'https://airvat-test.firebaseio.com/';
const PROJECT_ID = 'airvat-test';
const storageBucket = 'airvat-test.appspot.com';
const MESSAGING_SENDER_ID = '501456361389';

const devConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: storageBucket,
  messagingSenderId: MESSAGING_SENDER_ID,
};

const prodConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: storageBucket,
  messagingSenderId: MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp (config);
}

export const auth = firebase.auth();
export const db = firebase.database();
