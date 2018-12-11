import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
  rater: {
    type: String,
    required: true
  },
  ratee: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: [true, 'Driver', 'Rider']
  },
  rides: {
    type: String,
    id: []
  }
});

// ratingSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

export const Rating = mongoose.model('Rating', ratingSchema);
