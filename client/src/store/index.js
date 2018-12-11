/* eslint-disable no-console */

// store
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { middleware } from './middleware';

import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from '../services/firebase';


// reducers
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import { reducer as ridesReducer, initialState as ridesInitial } from './resources/rides/reducers';
import { reducer as usersReducer, initialState as usersInitial } from './resources/users/reducers';


// create combined reducer

const initialState = {
  rides: ridesInitial,
  users: usersInitial
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  rides: ridesReducer,
  users: usersReducer
});

// create store

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

const enhancers = [
  reduxFirestore(firebase),
  reactReduxFirebase(
    firebase,
    { userProfile: 'users', useFirestoreForProfile: true }
  ),
  applyMiddleware(...middleware)
];

const reduxDevToolsExtension = window.devToolsExtension;
if(process.env.NODE_ENV === 'development' && typeof reduxDevToolsExtension === 'function') {
  enhancers.push(reduxDevToolsExtension());
}

const composedEnhancers = compose(
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
