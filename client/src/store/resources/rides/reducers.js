export const initialState = { selectedRide: null };

export function reducer(state = initialState, action) {
  if(action.type === 'selectRide') {
    return { ...state, selectedRide: action.ride };
  }
  return state;
}
