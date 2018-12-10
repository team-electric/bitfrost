"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("./middleware/cors"));

var _spa = _interopRequireDefault(require("./middleware/spa"));

var _error = require("./middleware/error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphqlHTTP = require('express-graphql');

var schema = require('./resources/schema'); // const { Person } = require('./resources/people/model');


var app = (0, _express.default)();
app.use((0, _morgan.default)('dev', {
  skip: function skip() {
    return process.env.NODE_ENV === 'development';
  }
}));
app.use(_express.default.static('../client/dist'));
app.use(_express.default.json());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.use('*', (0, _spa.default)('../client/dist/index.html'));
app.use(_error.errorHandler);
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map