// import { POST_RIDE, GET_RIDE } from './actions';

export const initialState = { selectedRide: {} };

export function reducer(state = initialState, action) {
  if(action.type === 'selectRide') {
    return { ...state, selectedRide: action.ride };
  }
  return state;
}

// export const initialState = {
//   createdRide: null,
//   loadPreviousRide: null
// };

// export function reducer(state = initialState, { type, payload }) {
//   switch(type) {
//     case POST_RIDE:
//       return { ...state, createdRide: payload.ride };
//     case GET_RIDE:
//       return { ...state, loadPreviousRide: payload.ride };
//     default:
//       return state;
//   }
// }
