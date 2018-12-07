import { getResults } from '../../../services/polls';

export const FETCH_RESULTS = 'FETCH_RESULTS';
export const FETCH_RESULTS_START = 'FETCH_RESULTS_START';
export const FETCH_RESULTS_DONE = 'FETCH_RESULTS_DONE';

export const fetchResults = id => ({
  type: FETCH_RESULTS,
  loadStart: FETCH_RESULTS_START,
  loadEnd: FETCH_RESULTS_DONE,
  payload: getResults(id)
});
