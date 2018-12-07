"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropCollection = exports.disconnect = exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _url = require("url");

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

var log = function log(event, dbUrl) {
  return function () {
    return console.log("".concat(event.toUpperCase(), ": connection to ").concat(dbUrl));
  };
};

var redactURLAuth = function redactURLAuth(url) {
  var parsedUrl = (0, _url.parse)(url);
  var redactedAuth = parsedUrl.auth ? '***:***@' : '';
  return "".concat(parsedUrl.protocol, "//").concat(redactedAuth).concat(parsedUrl.hostname, ":").concat(parsedUrl.port).concat(parsedUrl.path);
};

var connect = function connect() {
  var dbUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.MONGODB_URI;

  _mongoose.default.connect(dbUrl, {
    useNewUrlParser: true
  });

  var redactedUrl = redactURLAuth(dbUrl);

  _mongoose.default.connection.on('error', log('error', redactedUrl));

  _mongoose.default.connection.on('open', log('open', redactedUrl));

  _mongoose.default.connection.on('close', log('close', redactedUrl));

  process.on('SIGINT', function () {
    _mongoose.default.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

exports.connect = connect;

var disconnect = function disconnect() {
  return _mongoose.default.connection.close();
};

exports.disconnect = disconnect;

var dropCollection = function dropCollection(name) {
  var MONGODB_URI = process.env.MONGODB_URI;
  connect(MONGODB_URI);
  return _mongoose.default.connection.dropCollection(name).catch(function (err) {
    if (err.codeName !== 'NamespaceNotFound') throw err;
  });
};

exports.dropCollection = dropCollection;
//# sourceMappingURL=db.js.map