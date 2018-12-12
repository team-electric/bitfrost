/* eslint-disable no-console */

// store
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { middleware } from './middleware';
import 'firebase/auth';
import 'firebase/firestore';

// reducers
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import { reducer as ridesReducer, initialState as ridesInitial } from './resources/rides/reducers';
import { reducer as usersReducer, initialState as usersInitial } from './resources/users/reducers';
import { reducer as carsReducer, initialState as carsInitial } from './resources/cars/reducers';


// create combined reducer

const initialState = {
  rides: ridesInitial,
  users: usersInitial,
  cars: carsInitial,
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  rides: ridesReducer,
  users: usersReducer,
  cars: carsReducer,
});

// create store
import firebase from 'firebase/app';
import config from '../services/firebase';
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

const enhancers = [
  reduxFirestore(firebase),
  reactReduxFirebase(
    firebase,
    { userProfile: 'users', useFirestoreForProfile: true }
  ),
  applyMiddleware(...middleware)
];

const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
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
