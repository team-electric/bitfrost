export const getRides = state => state.firestore.ordered.rides || [];

export const getSelectedRide = (state, id) => getRides(state).find(ride => ride.id === id);
