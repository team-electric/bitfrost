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

const newCar = car => JSON.stringify({
  query:
    `query {
      createCar(
        userId: "${car.userId}"
        seats: "${car.seats}"
        plate: "${car.plate}"
        make: "${car.make}"
        model: "${car.model}"
      )
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
export const createCar = car => request(newCar(car));
