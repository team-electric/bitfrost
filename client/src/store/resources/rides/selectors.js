export const getRides = state => {
  return Object.keys(state.firestore.data.rides || {}).map(id => ({
    ...state.firestore.data.rides[id],
    id
  }));
};

export const getSelectedRide = (state, id) => state.firestore.data.rides && { ...state.firestore.data.rides[id], id };
