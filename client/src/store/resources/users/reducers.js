import { FETCH_USERS, FETCH_USERS_START, FETCH_USERS_DONE } from './actions';

export const initialState = {
  list: null,
  loading: false
};

export function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case FETCH_USERS:
      return { ...state, list: payload.users };
    case FETCH_USERS_START:
      return { ...state, loading: true };
    case FETCH_USERS_DONE:
      return { ...state, loading: false };
    default:
      return state;
  }
}
