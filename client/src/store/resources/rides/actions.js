import { createRide } from '../../../services/mongo/rides';

export const POST_RIDE = 'POST_RIDE';
export const postRide = ride => ({
  type: POST_RIDE,
  payload: createRide(ride)
});
