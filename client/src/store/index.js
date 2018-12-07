/* eslint-disable no-console */
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { middleware } from './middleware';
import pollsReducer from './resources/polls/reducers';
import resultsReducer from './resources/results/reducers';
import sessionsReducer from './resources/sessions/reducers';

const reducer = combineReducers({
  polls: pollsReducer,
  results: resultsReducer,
  session: sessionsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  ));
