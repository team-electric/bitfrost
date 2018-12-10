"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cookieParser = require('cookie-parser');

var jwt = require('jsonwebtoken');

require('dotenv').config();

var createServer = require('./createServer');

var db = require('./db');

var server = createServer();
server.express.use(cookieParser()); // decode the JWT so we can get the user Id on each request

server.express.use(function (req, res, next) {
  var token = req.cookies.token;

  if (token) {
    var _jwt$verify = jwt.verify(token, process.env.APP_SECRET),
        userId = _jwt$verify.userId; // put the userId onto the req for future requests to access


    req.userId = userId;
  }

  next();
}); // 2. Create a middleware that populates the user on each request

server.express.use(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.userId) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            _context.next = 4;
            return db.query.user({
              where: {
                id: req.userId
              }
            }, '{ id, permissions, email, name }');

          case 4:
            user = _context.sent;
            req.user = user;
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, function (deets) {
  console.log("Server is now running on port http://localhost:".concat(deets.port));
});
//# sourceMappingURL=index.js.map