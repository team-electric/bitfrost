"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _spa = _interopRequireDefault(require("./middleware/spa"));

var _error = require("./middleware/error");

var _dotenv = require("dotenv");

var _db = require("./lib/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// express
var app = (0, _express.default)(); // logging

app.use((0, _morgan.default)('dev', {
  skip: function skip() {
    return process.env.NODE_ENV === 'development';
  }
})); // basic express stuff

app.use(_express.default.static('../client/dist'));
app.use(_express.default.json()); // graph QL stuff

var graphqlHTTP = require('express-graphql');

var schema = require('./resources');

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})); // serve the front end

app.use('*', (0, _spa.default)('../client/dist/index.html')); // catch errors

app.use(_error.errorHandler); // start the server

(0, _dotenv.config)();
(0, _db.connect)();
var PORT = process.env.PORT || 7890;
app.listen(PORT, function () {
  return console.log('Running on', PORT);
});
//# sourceMappingURL=index.js.map