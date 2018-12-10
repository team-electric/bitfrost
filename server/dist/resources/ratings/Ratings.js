"use strict";

var mongoose = require('mongoose');

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLID = _require.GraphQLID,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLString = _require.GraphQLString,
    GraphQLEnumType = _require.GraphQLEnumType;

var RatingType = new GraphQLObjectType({
  name: 'Rating',
  description: 'Rating info',
  fields: function fields() {
    return {
      rater: {
        type: new GraphQLNonNull(GraphQLString)
      },
      ratee: {
        type: new GraphQLNonNull(GraphQLString)
      },
      userType: {
        type: new GraphQLNonNull(GraphQLEnumType)
      },
      rides: {
        type: new GraphQLNonNull(GraphQLEnumType)
      }
    };
  }
});
var ratingSchema = mongoose.Schema({
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
}); // ratingSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

var Rating = mongoose.model('Rating', ratingSchema);
module.exports = {
  Rating: Rating,
  RatingType: RatingType
};
//# sourceMappingURL=Ratings.js.map