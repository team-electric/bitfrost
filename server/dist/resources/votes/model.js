"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var voteSchema = new _mongoose.default.Schema({
  poll: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  selection: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Poll.choices',
    required: true
  }
});

var _default = _mongoose.default.model('Vote', voteSchema);

exports.default = _default;
//# sourceMappingURL=model.js.map