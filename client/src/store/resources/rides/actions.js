import { createRide, fetchUpcomingRide } from '../../../services/mongo/rides';

export const POST_RIDE = 'POST_RIDE';
export const postRide = ride => ({
  type: POST_RIDE,
  payload: createRide(ride)
});

export const GET_RIDE = 'GET_RIDE';
export const getRide = ride => ({
  type: GET_RIDE,
  payload: fetchUpcomingRide(ride)
});
