export const getUserCar = state => state.cars.current;

export const getCarLoading = state => state.cars.loadingCurrent;

export const getUserNewCar = state => state.cars.current.createCar;
