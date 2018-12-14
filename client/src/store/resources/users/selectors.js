export const getUsers = state => state.users.list;

export const getUser = state => state.users.current;

export const getAuth = state => state.firebase.auth;

export const getUserLoading = state => state.users.loadingCurrent;

export const getUserError = state => state.users.errorCurrent;

export const updateUser = state => state.users.current;

export const getRideUser = state =>
  state.firestore.ordered.users && state.firestore.ordered.users[0];

export const getRideData = state =>
  getRideUser(state) &&
  getRideUser(state).providerData &&
  getRideUser(state).providerData[0];
