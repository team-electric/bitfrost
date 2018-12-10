export const initialState = { selectedEvent: null };

export function reducer(state = initialState, action) {
  if(action.type === 'selectEvent') {
    return { ...state, selectedEvent: action.category };
  }
  return state;
}
