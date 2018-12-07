import { getPolls, getPoll } from '../../../services/polls';

export const FETCH_POLLS = 'FETCH_POLLS';
export const FETCH_POLLS_LOADING = 'FETCH_POLLS_START';
export const FETCH_POLLS_DONE = 'FETCH_POLLS_DONE';
export const fetchPolls = () => ({
  type: FETCH_POLLS,
  loadStart: FETCH_POLLS_LOADING,
  loadEnd: FETCH_POLLS_DONE,
  payload: getPolls()
});

export const FETCH_POLL = 'FETCH_POLL';
export const FETCH_POLL_LOADING = 'FETCH_POLL_START';
export const FETCH_POLL_DONE = 'FETCH_POLL_DONE';
export const fetchPoll = id => ({
  type: FETCH_POLL,
  loadStart: FETCH_POLL_LOADING,
  loadEnd: FETCH_POLL_DONE,
  payload: getPoll(id)
});
