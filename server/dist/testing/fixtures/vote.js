"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runVotes = exports.randomVoteArrays = exports.randomVoteQuantities = exports.mockVote = void 0;

var _app = _interopRequireDefault(require("../../app"));

var _supertest = _interopRequireDefault(require("supertest"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chance = require('chance').Chance();

var mockVote = function mockVote() {
  return {
    poll: _mongoose.Types.ObjectId(),
    selection: _mongoose.Types.ObjectId()
  };
};

exports.mockVote = mockVote;

var vote = function vote(poll, i) {
  return {
    poll: poll._id,
    selection: poll.choices[i]._id
  };
};

var sendVote = function sendVote(poll, vote, token) {
  return (0, _supertest.default)(_app.default).post("/api/polls/".concat(poll._id, "/votes")).set('Authorization', "Bearer ".concat(token)).send(vote);
};

var randomVoteQuantities = function randomVoteQuantities(length) {
  return Array(length).fill().map(function () {
    return chance.natural({
      min: 1,
      max: 20
    });
  });
};

exports.randomVoteQuantities = randomVoteQuantities;

var randomVoteArrays = function randomVoteArrays(quantities, poll) {
  return quantities.map(function (quantity, i) {
    var id = poll.choices[i]._id;
    return Array(quantity).fill(poll.choices[i]._id);
  });
};

exports.randomVoteArrays = randomVoteArrays;

var runVotes = function runVotes(poll, voteArrays, token) {
  return voteArrays.forEach(function (array, index) {
    array.forEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var voteToSend;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              voteToSend = vote(poll, index);
              _context.next = 3;
              return sendVote(poll, voteToSend, token);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  });
};

exports.runVotes = runVotes;
//# sourceMappingURL=vote.js.map