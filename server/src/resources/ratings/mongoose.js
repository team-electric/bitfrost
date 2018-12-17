import { model, Schema } from 'mongoose';

const ratingSchema = Schema({
  ride: {
    type: Schema.Types.ObjectId,
    ref: 'Ride',
    required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rider: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rater: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  value: {
    type: Number,
    required: true,
  }
});

export const Rating = model('Rating', ratingSchema);
