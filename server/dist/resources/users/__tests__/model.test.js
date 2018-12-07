"use strict";

var _model = _interopRequireDefault(require("../model"));

var _errors = require("../../../testing/lib/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('user model', function () {
  test('validates a good model', function () {
    var data = {
      email: 'jack@test.com'
    };
    var user = new _model.default(data);
    var jsonUser = user.toJSON();
    expect(jsonUser).toEqual(_objectSpread({}, data, {
      _id: expect.any(Object)
    }));
  });
  test('requires email', function () {
    var vote = new _model.default({});
    var errors = (0, _errors.getErrors)(vote.validateSync(), 1);
    expect(errors.email.properties.message).toEqual('Path `email` is required.');
  });
});
//# sourceMappingURL=model.test.js.map