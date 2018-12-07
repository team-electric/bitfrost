"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _routes = _interopRequireDefault(require("./polls/routes"));

var _routes2 = _interopRequireDefault(require("./users/routes"));

var _routes3 = _interopRequireDefault(require("./votes/routes"));

var _Router;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resources = [_routes.default, _routes2.default, _routes3.default];

var _default = (_Router = (0, _express.Router)()).use.apply(_Router, ['/'].concat(resources));

exports.default = _default;
//# sourceMappingURL=index.js.map