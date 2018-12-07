"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _model = _interopRequireDefault(require("./model"));

var _model2 = _interopRequireDefault(require("../votes/model"));

var _requireAuth = _interopRequireDefault(require("../../middleware/requireAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _express.Router)().post('/polls', _requireAuth.default, function (req, res, next) {
  var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description,
      choices = _req$body.choices;

  _model.default.create({
    title: title,
    description: description,
    choices: choices
  }).then(function (poll) {
    return res.json(poll);
  }).catch(next);
}).get('/polls/:id', function (req, res, next) {
  var id = req.params.id;

  _model.default.findById(id).lean().then(function (poll) {
    return res.json(poll);
  }).catch(next);
}).get('/polls', function (req, res, next) {
  _model.default.find().lean().then(function (polls) {
    return res.json(polls);
  }).catch(next);
});

exports.default = _default;
//# sourceMappingURL=routes.js.map