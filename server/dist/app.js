"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _resources = _interopRequireDefault(require("./resources"));

var _cors = _interopRequireDefault(require("./middleware/cors"));

var _spa = _interopRequireDefault(require("./middleware/spa"));

var _error = require("./middleware/error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphqlHTTP = require('express-graphql');

var schema = require('./resources/schema');

var _require = require('./resources/people/model'),
    Person = _require.Person;

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
app.use('/api', _resources.default);
app.use('*', (0, _spa.default)('../client/dist/index.html'));
app.use(_error.errorHandler);
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map