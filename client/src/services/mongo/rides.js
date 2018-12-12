import { request } from './index';

const newRide = ride => JSON.stringify({
  query:
    `query {
      createRide(
        driver: "${ride.driver}"
        riders: ["${ride.riders[0]}", "${ride.riders[1]}"]
        seats: ${ride.seats}
        comments: "${ride.comments}"
        origin: "${ride.origin}"
        destination: { zip: "${ride.zip}" }
        depart: "${ride.depart}"
        arrive: "${ride.arrive}"
      )
      {
        _id
        driver
        riders
        seats
        comments
        origin
        destination { zip }
        depart
        arrive
      }
    }`
});

export const createRide = ride => request(newRide(ride));
