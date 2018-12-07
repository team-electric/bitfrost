"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.untokenize = exports.tokenize = exports.compare = exports.hash = void 0;

var _dotenv = require("dotenv");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

(0, _dotenv.config)();
var APP_SECRET = process.env.APP_SECRET;
var EXPIRE_AT = '24h';

var hash = function hash(clear) {
  return (0, _bcryptjs.hashSync)(clear, 8);
};

exports.hash = hash;

var compare = function compare(clear, hash) {
  return (0, _bcryptjs.compareSync)(clear, hash);
};

exports.compare = compare;

var tokenize = function tokenize(payload) {
  return (0, _jsonwebtoken.sign)({
    payload: payload
  }, APP_SECRET, {
    expiresIn: EXPIRE_AT
  });
};

exports.tokenize = tokenize;

var untokenize = function untokenize(token) {
  return (0, _jsonwebtoken.verify)(token, APP_SECRET).payload;
};

exports.untokenize = untokenize;
//# sourceMappingURL=auth.js.map