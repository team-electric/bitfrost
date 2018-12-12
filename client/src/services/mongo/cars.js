import { request } from './index';

const carByUserId = userId => JSON.stringify({
  query:
    `query {
      car(userId: "${userId}")
      {
        _id
        userId
        seats
        plate
        make
        model
      }
    }`
});
export const getCar = userId => request(carByUserId(userId));
