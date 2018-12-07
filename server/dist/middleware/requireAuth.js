"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = _interopRequireDefault(require("../resources/users/model"));

var _error = require("./error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(req, res, next) {
  var authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(new _error.HttpError({
      code: 401,
      message: 'Missing token'
    }));
  }

  var token = authHeader.replace(/bearer /i, '');

  if (!token) {
    return next(new _error.HttpError({
      code: 401,
      message: 'Invalid blank token'
    }));
  }

  try {
    _model.default.findByToken(token).then(function (user) {
      req.user = user;
      next();
    });
  } catch (e) {
    return next(new _error.HttpError({
      code: 401,
      message: 'Invalid token'
    }));
  }
};

exports.default = _default;
//# sourceMappingURL=requireAuth.js.map