const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Testing testing, 123, I'm with the mic, so let me be");
});

exports.updateRide = functions.firestore
  .document('rides/{userId}')
  .onUpdate((change, context) => {
    const completedRide = change.after.data();
    const {
      driver, riders, seats,
      depart, arrive,
      origin, destination
    } = completedRide;

    // send completedRide to mongoDB




    // delete ride from firestore

  });
