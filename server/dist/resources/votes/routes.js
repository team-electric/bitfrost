"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _model = _interopRequireDefault(require("./model"));

var _model2 = _interopRequireDefault(require("../polls/model"));

var _requireAuth = _interopRequireDefault(require("../../middleware/requireAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _express.Router)().post('/polls/:id/votes', _requireAuth.default, function (req, res, next) {
  var _req$body = req.body,
      poll = _req$body.poll,
      selection = _req$body.selection;

  _model.default.create({
    poll: poll,
    selection: selection
  }).then(function (vote) {
    return res.json(vote);
  }).catch(next);
}).get('/polls/:id/results', function (req, res, next) {
  var id = req.params.id;

  _model2.default.findById(id).then(function (poll) {
    return poll.results();
  }).then(function (results) {
    return res.json(results);
  }).catch(next);
});

exports.default = _default;
//# sourceMappingURL=routes.js.map