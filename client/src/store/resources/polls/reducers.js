import {
  FETCH_POLLS_LOADING,
  FETCH_POLLS_DONE,
  FETCH_POLLS,
  FETCH_POLL_LOADING,
  FETCH_POLL_DONE,
  FETCH_POLL
} from './actions';

const initialState = {
  loading: false,
  list: [],
  details: null
};

export default function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case FETCH_POLLS_LOADING:
      return { ...state, loading: true };
    case FETCH_POLLS_DONE:
      return { ...state, loading: false };
    case FETCH_POLLS:
      return { ...state, list: payload };
    case FETCH_POLL_LOADING:
      return { ...state, loading: true };
    case FETCH_POLL_DONE:
      return { ...state, loading: false };
    case FETCH_POLL:
      return { ...state, details: payload };
    default:
      return state;
  }
}
