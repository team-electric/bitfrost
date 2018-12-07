"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var pollSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  choices: {
    type: [{
      description: String
    }],
    validate: function validate(choices) {
      return choices.length !== 0;
    }
  }
});

pollSchema.methods.results = function () {
  return this.model('Vote').aggregate([{
    $match: {
      poll: this._id
    }
  }, {
    $group: {
      _id: "$selection",
      count: {
        $sum: 1
      }
    }
  }, {
    $sort: {
      "count": -1
    }
  }]);
};

var _default = _mongoose.default.model('Poll', pollSchema);

exports.default = _default;
//# sourceMappingURL=model.js.map