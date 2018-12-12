const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Testing testing, 123, I'm with the mic, so let me be");
});
