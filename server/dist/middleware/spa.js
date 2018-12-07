"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _default = function _default(file) {
  return function (req, res) {
    return res.sendFile((0, _path.join)(__dirname, '../..', file));
  };
};

exports.default = _default;
//# sourceMappingURL=spa.js.map