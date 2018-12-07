"use strict";

var _app = _interopRequireDefault(require("../../../app"));

var _supertest = _interopRequireDefault(require("supertest"));

var _db = require("../../../lib/db");

var _auth = require("../../../lib/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('auth routes', function () {
  beforeAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _db.connect)();

          case 2:
            _context.next = 4;
            return (0, _db.dropCollection)('users');

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  afterAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _db.disconnect)();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
  it('creates a user', function () {
    return (0, _supertest.default)(_app.default).post('/api/users/signup').send({
      email: 'test@test.com',
      password: '1234'
    }).then(function (res) {
      expect(res.body).toEqual({
        _id: expect.any(String),
        email: 'test@test.com'
      });
    });
  });
  it('login a user', function () {
    return (0, _supertest.default)(_app.default).post('/api/users/login').send({
      email: 'test@test.com',
      password: '1234'
    }).then(function (res) {
      expect(res.body).toEqual({
        _id: expect.any(String),
        email: 'test@test.com'
      });
      expect(res.get('X-AUTH-TOKEN')).toEqual(expect.any(String));
    });
  });
  it('fails to login a user with a bad password', function () {
    return (0, _supertest.default)(_app.default).post('/api/users/login').send({
      email: 'test@test.com',
      password: '1234567'
    }).then(function (res) {
      expect(res.status).toEqual(401);
    });
  });
  it('can verify a user', function () {
    var token = (0, _auth.tokenize)({
      _id: '1234',
      email: 'test@test.com'
    });
    return (0, _supertest.default)(_app.default).get('/api/users/verify').set('Authorization', "Bearer ".concat(token)).then(function (res) {
      expect(res.body).toEqual({
        _id: '1234',
        email: 'test@test.com'
      });
    });
  });
});
//# sourceMappingURL=routes.test.js.map