import {
  FETCH_USERS, FETCH_USERS_START, FETCH_USERS_DONE,
  FETCH_USER, FETCH_USER_START, FETCH_USER_DONE
} from './actions';

export const initialState = {
  list: null,
  current: null,
  loadingList: false,
  loadingCurrent: false
};

export function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case FETCH_USERS:
      return { ...state, list: payload.users };
    case FETCH_USER:
      return { ...state, current: payload.userByEmail };
    case FETCH_USERS_START:
      return { ...state, loadingList: true };
    case FETCH_USERS_DONE:
      return { ...state, loadingList: false };
    case FETCH_USER_START:
      return { ...state, loadingCurrent: true };
    case FETCH_USER_DONE:
      return { ...state, loadingCurrent: false };
    default:
      return state;
  }
}
