

const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType
} = require('graphql');

const RatingType = new GraphQLObjectType({
  name: 'Rating',
  description: 'Rating info',
  fields: () => ({
    rater: { type: new GraphQLNonNull(GraphQLString) },
    ratee: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLEnumType) },
    rides: { type: new GraphQLNonNull(GraphQLEnumType) },
  })
});

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

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = {
  Rating,
  RatingType
}
