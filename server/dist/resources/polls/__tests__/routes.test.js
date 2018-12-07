"use strict";

var _errors = require("../../../testing/lib/errors");

var _db = require("../../../lib/db");

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../../../app"));

var _poll = require("../../../testing/fixtures/poll");

var _vote = require("../../../testing/fixtures/vote");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chance = require('chance').Chance();

describe('polls routes', function () {
  var createdUser;
  var createdToken;
  beforeEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _supertest.default)(_app.default).post('/api/users/signup').send({
              email: 'jack@test.com',
              password: 'abcdef'
            });

          case 2:
            _context.next = 4;
            return (0, _supertest.default)(_app.default).post('/api/users/login').send({
              email: 'jack@test.com',
              password: 'abcdef'
            }).then(function (res) {
              createdUser = res.body;
              createdToken = res.header['x-auth-token'];
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  beforeAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _db.dropCollection)('polls');

          case 2:
            _context2.next = 4;
            return (0, _db.dropCollection)('votes');

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
  afterAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _db.disconnect)();

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
  test('post to /api/polls',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var poll;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            poll = (0, _poll.mockPoll)();
            _context4.next = 3;
            return (0, _supertest.default)(_app.default).post('/api/polls').set('Authorization', "Bearer ".concat(createdToken)).send(poll).then(function (res) {
              (0, _errors.checkCode)(200)(res);
              expect(res.body).toEqual(_objectSpread({}, poll, {
                _id: expect.any(String),
                __v: expect.any(Number),
                choices: poll.choices.map(function (choice) {
                  return _objectSpread({}, choice, {
                    _id: expect.any(String)
                  });
                })
              }));
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));
  test('get to /api/polls',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var polls;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            polls = (0, _poll.mockPolls)(10);
            polls.forEach(function (poll) {
              return (0, _poll.postPoll)(poll, createdToken);
            });
            _context5.next = 4;
            return (0, _supertest.default)(_app.default).get('/api/polls').then(function (res) {
              (0, _errors.checkCode)(200)(res);
              polls.forEach(function (poll) {
                expect(res.body).toContainEqual(_objectSpread({}, poll, {
                  _id: expect.any(String),
                  __v: expect.any(Number),
                  choices: poll.choices.map(function (choice) {
                    return _objectSpread({}, choice, {
                      _id: expect.any(String)
                    });
                  })
                }));
              });
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  })));
  test('get to /api/polls/:id',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var poll, createdPoll;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            poll = (0, _poll.mockPoll)();
            _context6.next = 3;
            return (0, _supertest.default)(_app.default).post('/api/polls').set('Authorization', "Bearer ".concat(createdToken)).send(poll).then(function (_ref7) {
              var body = _ref7.body;
              return createdPoll = body;
            });

          case 3:
            _context6.next = 5;
            return (0, _supertest.default)(_app.default).get("/api/polls/".concat(createdPoll._id)).then(function (res) {
              (0, _errors.checkCode)(200)(res);
              expect(res.body).toEqual(createdPoll);
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  })));
});
//# sourceMappingURL=routes.test.js.map