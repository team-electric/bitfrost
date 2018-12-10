"use strict";

var mongoose = require('mongoose');

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLID = _require.GraphQLID,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLString = _require.GraphQLString,
    GraphQLInt = _require.GraphQLInt;

var CarType = new GraphQLObjectType({
  name: 'Car',
  description: 'A Car',
  fields: function fields() {
    return {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      plate: {
        type: new GraphQLNonNull(GraphQLString)
      },
      make: {
        type: new GraphQLNonNull(GraphQLString)
      },
      model: {
        type: new GraphQLNonNull(GraphQLString)
      },
      seats: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      userID: {
        type: new GraphQLNonNull(GraphQLString)
      }
    };
  }
});
var carSchema = mongoose.Schema({
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
  }
});
var Car = mongoose.model('Car', carSchema);
module.exports = {
  Car: Car,
  CarType: CarType
};
//# sourceMappingURL=cars.js.map