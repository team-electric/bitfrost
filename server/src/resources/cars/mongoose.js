import { model, Schema } from 'mongoose';

const carSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  plate: {
    type: String
  },
  make: {
    type: String
  },
  model: {
    type: String
  }
});

export const Car = model('Car', carSchema);
