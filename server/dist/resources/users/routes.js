"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _model = _interopRequireDefault(require("./model"));

var _requireAuth = _interopRequireDefault(require("../../middleware/requireAuth"));

var _error = require("../../middleware/error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _express.Router)().post('/users/signup', function (req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  _model.default.create({
    email: email,
    password: password
  }).then(function (user) {
    return res.json(user);
  }).catch(next);
}).post('/users/login', function (req, res, next) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  _model.default.findOne({
    email: email
  }).then(function (user) {
    if (!user.compare(password)) return next(new _error.HttpError({
      code: 401,
      message: 'Invalid email/password'
    }));
    var authToken = user.authToken();
    res.setHeader('X-AUTH-TOKEN', authToken);
    res.json(user);
  }).catch(next);
}).get('/users/verify', _requireAuth.default, function (req, res, next) {
  res.json(req.user);
});

exports.default = _default;
//# sourceMappingURL=routes.js.map