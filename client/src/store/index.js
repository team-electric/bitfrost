/* eslint-disable no-console */

// store
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { middleware } from './middleware';

import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { config as firebaseConfig } from '../services/firebase';


// reducers
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import pollsReducer from './resources/polls/reducers';
import resultsReducer from './resources/results/reducers';
import sessionsReducer from './resources/sessions/reducers';
import eventsReducer from './resources/events/reducers';

// create combined reducer

const initialState = {};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  polls: pollsReducer,
  results: resultsReducer,
  session: sessionsReducer,
  events: eventsReducer
});

// create store


// firebase.initializeApp(firebaseConfig);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  ));
