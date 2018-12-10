"use strict";

var _superagent = _interopRequireDefault(require("superagent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const { dropCollection } = require('../util/db');
var chance = require('chance').Chance();

var HOST = 'http://localhost:9876';
var symbols = ['BTC', 'XRP', 'ETH', 'LTC'];
Promise.all(Array.apply(null, {
  length: 20
}).map(function () {
  return {
    name: chance.name(),
    clearPassword: chance.word(),
    email: chance.email()
  };
}).map(function (user) {
  return _superagent.default.post("".concat(HOST, "/api/auth/signup")).send({
    name: "".concat(user.name),
    email: "".concat(user.email),
    clearPassword: "".concat(user.clearPassword)
  }).then(function (_ref) {
    var body = _ref.body;
    return body.token;
  });
})).then(function (tokens) {
  return Promise.all(tokens.map(function (token) {
    return Promise.all(Array.apply(null, {
      length: 10
    }).map(function (_, i) {
      return _superagent.default.post("".concat(HOST, "/api/users/transactions")).set('Authorization', "Bearer ".concat(token)).send({
        currency: symbols[i % symbols.length],
        exchange: 'Fake Market',
        quantity: chance.natural({
          min: 1,
          max: 20
        })
      });
    }));
  }));
});
//# sourceMappingURL=seed-db.js.map