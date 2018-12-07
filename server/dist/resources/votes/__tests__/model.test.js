"use strict";

var _model = _interopRequireDefault(require("../model"));

var _errors = require("../../../testing/lib/errors");

var _vote = require("../../../testing/fixtures/vote");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('vote model', function () {
  test('validates a good model', function () {
    var data = (0, _vote.mockVote)();
    var vote = new _model.default(data);
    var jsonVote = vote.toJSON();
    expect(jsonVote).toEqual(_objectSpread({}, data, {
      _id: expect.any(Object)
    }));
  });
  test('requires poll and selection', function () {
    var vote = new _model.default({});
    var errors = (0, _errors.getErrors)(vote.validateSync(), 2);
    expect(errors.poll.properties.message).toEqual('Path `poll` is required.');
    expect(errors.selection.properties.message).toEqual('Path `selection` is required.');
  });
});
//# sourceMappingURL=model.test.js.map