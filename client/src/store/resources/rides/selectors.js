export const getSelectedRide = (state, id) => state.firestore.ordered.rides.filter(ride => ride.id === id);
