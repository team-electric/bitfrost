"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _auth = require("../../lib/auth");

var userSchema = new _mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: String
}, {
  toJSON: {
    transform: function transform(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
      return ret;
    }
  }
});
userSchema.virtual('password').set(function (password) {
  this._tempPassword = password;
});
userSchema.pre('save', function (next) {
  this.passwordHash = (0, _auth.hash)(this._tempPassword);
  next();
});

userSchema.methods.compare = function (password) {
  return (0, _auth.compare)(password, this.passwordHash);
};

userSchema.methods.authToken = function () {
  return (0, _auth.tokenize)(this);
};

userSchema.statics.findByToken = function (token) {
  return Promise.resolve((0, _auth.untokenize)(token));
};

var _default = (0, _mongoose.model)('User', userSchema);

exports.default = _default;
//# sourceMappingURL=model.js.map