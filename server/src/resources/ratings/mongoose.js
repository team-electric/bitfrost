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
  }
});

// ratingSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

export const Rating = model('Rating', ratingSchema);
