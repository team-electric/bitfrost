import request from '../graphql';

import allCars from './allCars';
export const getCars = () => request(allCars);

import newCar from './newCar';
export const createCar = car => request(newCar(car));
