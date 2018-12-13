import { getCar, createCar, findAndDeleteCar } from '../../../services/mongo/cars';

export const FETCH_CAR = 'FETCH_CAR';
export const FETCH_CAR_START = 'FETCH_CAR_START';
export const FETCH_CAR_DONE = 'FETCH_CAR_DONE';
export const fetchCar = userId => ({
  type: FETCH_CAR,
  loadStart: FETCH_CAR_START,
  loadEnd: FETCH_CAR_DONE,
  payload: getCar(userId)
});

export const POST_CAR = 'POST_CAR';
export const postCar = car => ({
  type: POST_CAR,
  payload: createCar(car)
});

export const DELETE_CAR = 'DELETE_CAR';
export const deleteCar = userId => ({
  type: DELETE_CAR,
  payload: findAndDeleteCar(userId)
});
