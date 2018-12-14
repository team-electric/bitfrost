export const getRides = state => {
  return Object.keys(state.firestore.data.rides || {}).map(id => ({
    ...state.firestore.data.rides[id],
    id
  }));
};

export const getUserRides = (state, id, _id) => {
  return Object.keys(state.firestore.data.rides || {}).map(id => ({
    ...state.firestore.data.rides[id],
    id
  })).filter(ride => {
    return ride.riders.some(rider => rider._id == _id) || (ride.uid === id);
  });
};

export const getSelectedRide = (state, id) => state.firestore.data.rides && { ...state.firestore.data.rides[id], id };
