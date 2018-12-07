"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCode = exports.getErrors = void 0;

var getErrors = function getErrors(validation, numberExpected) {
  expect(validation).toBeDefined();
  var errors = validation.errors;
  expect(Object.keys(errors)).toHaveLength(numberExpected);
  return errors;
};

exports.getErrors = getErrors;

var checkCode = function checkCode(statusCode) {
  return function (res) {
    expect(res.body.error).toBeUndefined();
    expect(res.status).toEqual(statusCode);
  };
};

exports.checkCode = checkCode;
//# sourceMappingURL=errors.js.map