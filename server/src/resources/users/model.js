import { Schema, model } from 'mongoose';
import { compare, tokenize, hash, untokenize } from '../../lib/auth';

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: String
},
  {
    toJSON: {
      transform: function (doc, ret) {
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
  this.passwordHash = hash(this._tempPassword);
  next();
});

userSchema.methods.compare = function (password) {
  return compare(password, this.passwordHash);
};

userSchema.methods.authToken = function () {
  return tokenize(this);
};

userSchema.statics.findByToken = function (token) {
  return Promise.resolve(untokenize(token));
}

export default model('User', userSchema);
