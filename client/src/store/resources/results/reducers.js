import { FETCH_RESULTS, FETCH_RESULTS_DONE } from './actions';
import { FETCH_POLLS_LOADING } from '../polls/actions';

const initialState = {
  loading: false,
  list: []
};

export default function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case FETCH_RESULTS:
      return { ...state, list: payload };
    case FETCH_POLLS_LOADING:
      return { ...state, loading: true };
    case FETCH_RESULTS_DONE:
      return { ...state, loading: false };
    default:
      return state;
  }
}
