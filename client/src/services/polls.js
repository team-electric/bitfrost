import { get, post } from './requests';

const POLLS_API = '/api/polls';

export const getPoll = id => get(`${POLLS_API}/${id}`);

export const getPolls = () =>  get(`${POLLS_API}`);

export const getResults = id => get(`${POLLS_API}/${id}/results`);

export const postPoll = poll => post(`${POLLS_API}`, poll);

export const postVote = (id, vote) => post(`${POLLS_API}/${id}/votes`, vote);
