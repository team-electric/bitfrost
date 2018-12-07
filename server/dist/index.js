"use strict";

var _app = _interopRequireDefault(require("./app"));

var _dotenv = require("dotenv");

var _db = require("./lib/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
(0, _db.connect)();
var PORT = process.env.PORT || 7890;

_app.default.listen(PORT, function () {
  console.log('Running on', PORT); // eslint-disable-line no-console
});
//# sourceMappingURL=index.js.map