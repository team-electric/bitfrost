"use strict";

var _model = _interopRequireDefault(require("../model"));

var _errors = require("../../../testing/lib/errors");

var _poll = require("../../../testing/fixtures/poll");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chance = require('chance').Chance();

describe('poll model', function () {
  test('validates a good model', function () {
    var data = (0, _poll.mockPoll)();
    var poll = new _model.default(data);
    var jsonPoll = poll.toJSON();
    expect(jsonPoll).toEqual(_objectSpread({}, data, {
      _id: expect.any(Object),
      choices: data.choices.map(function (choice) {
        return _objectSpread({}, choice, {
          _id: expect.any(Object)
        });
      })
    }));
  });
  test('requires title, description, and choices', function () {
    var poll = new _model.default({});
    var errors = (0, _errors.getErrors)(poll.validateSync(), 3);
    expect(errors.title.properties.message).toEqual('Path `title` is required.');
    expect(errors.description.properties.message).toEqual('Path `description` is required.');
    expect(errors.choices.properties.message).toEqual('Validator failed for path `choices` with value ``');
  });
});
//# sourceMappingURL=model.test.js.map