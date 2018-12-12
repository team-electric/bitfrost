import {
  FETCH_CAR, FETCH_CAR_START, FETCH_CAR_DONE, POST_CAR
} from './actions';

export const initialState = {
  current: null,
  loadingCurrent: false,
};

export function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case FETCH_CAR:
      return { ...state, current: payload.car };
    case FETCH_CAR_START:
      return { ...state, loadingCurrent: true };
    case FETCH_CAR_DONE:
      return { ...state, loadingCurrent: false };
    case POST_CAR:
      return { ...state, current: payload.createCar };
    default:
      return state;
  }
}
