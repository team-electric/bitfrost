import { getCar } from '../../../services/mongo/cars';

export const FETCH_CAR = 'FETCH_CAR';
export const FETCH_CAR_START = 'FETCH_CAR_START';
export const FETCH_CAR_DONE = 'FETCH_CAR_DONE';
export const fetchCar = email => ({
  type: FETCH_CAR,
  loadStart: FETCH_CAR_START,
  loadEnd: FETCH_CAR_DONE,
  payload: getCar(email)
});
