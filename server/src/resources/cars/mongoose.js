import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
  plate: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
});

export const Car = mongoose.model('Car', carSchema);
