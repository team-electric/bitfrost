import { createRating } from '../../../services/mongo/rating';

export const POST_RATING = 'POST_RATING';
export const postRating = rating => ({
  type: POST_RATING,
  payload: createRating(rating)
});
