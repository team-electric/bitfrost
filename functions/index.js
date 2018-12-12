const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Testing testing, 123, I'm with the mic, so let me be");
});

exports.updateRide = functions.firestore
  .document('rides/{rideId}')
  .onUpdate((change, context) => {
    const completedRide = change.after.data();

    const {
      driver, riders, seats,
      depart, arrive,
      origin, destination
    } = completedRide;
    const ride = {
      driver, riders, seats,
      depart, arrive,
      origin, destination
    };

    createRide(ride);
  });


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

// eslint-disable-next-line
const graphqlReq = apiUrl => async(body) => {

  const response = await fetch(
    apiUrl,
    {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: body,
    });

  const responseJson = await response.json();
  return responseJson.data;
};

const request = graphqlReq(functions.config().mongodb.url);

const createRide = ride => request(newRide(ride));
