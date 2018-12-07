"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postPoll = exports.mockPolls = exports.mockPoll = void 0;

var _app = _interopRequireDefault(require("../../app"));

var _supertest = _interopRequireDefault(require("supertest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var chance = require('chance').Chance();

chance.mixin({
  poll: function poll() {
    return {
      title: chance.string({
        length: 10
      }),
      description: chance.string({
        length: 30
      }),
      choices: Array.apply(null, {
        length: 4
      }).map(function () {
        return {
          description: chance.string({
            length: 15
          })
        };
      })
    };
  }
});

var mockPoll = function mockPoll() {
  return chance.poll();
};

exports.mockPoll = mockPoll;

var mockPolls = function mockPolls(length) {
  return Array.apply(null, {
    length: length
  }).reduce(function (acc) {
    return _toConsumableArray(acc).concat([mockPoll()]);
  }, []);
};

exports.mockPolls = mockPolls;

var postPoll = function postPoll(poll, token) {
  return (0, _supertest.default)(_app.default).post('/api/polls').set('Authorization', "Bearer ".concat(token)).send(poll).then(function (res) {
    return res.body;
  });
};

exports.postPoll = postPoll;
//# sourceMappingURL=poll.js.map