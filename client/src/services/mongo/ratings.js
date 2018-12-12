import { request } from './index';

const newRating = rating => JSON.stringify({
  query:
    `query {
      mutation {
        createRating(
          driver: "${rating.driver}"
          rider: "${rating.rider}"
          ride: "${rating.ride}"
          rater: "${rating.rater}"
          value: ${rating.value}
        )
        {
          _id
          driver
          rider
          ride
          rater
          value
        }
      }
    }`
});
export const createRating = rating => request(newRating(rating));
