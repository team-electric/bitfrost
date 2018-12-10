"use strict";

var mongoose = require('mongoose');

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLString = _require.GraphQLString,
    GraphQLInt = _require.GraphQLInt;

var RidesType = new GraphQLObjectType({
  name: 'Rides',
  description: 'Rides info',
  fields: function fields() {
    return {
      driver: {
        type: new GraphQLNonNull(GraphQLString)
      },
      riders: {
        type: GraphQLString
      },
      comments: {
        type: GraphQLString
      },
      origin: {
        type: new GraphQLNonNull(GraphQLString)
      },
      destination: {
        street: {
          type: GraphQLString
        },
        city: {
          type: GraphQLString
        },
        state: {
          type: GraphQLString
        },
        zip: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        formatted: {
          type: GraphQLString,
          resolve: function resolve(obj) {
            return obj.street + obj.city + obj.state + obj.zip;
          }
        }
      },
      departure: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      arrival: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      currentLocation: {
        type: new GraphQLNonNull(GraphQLString)
      },
      departed: {
        type: new GraphQLNonNull(GraphQLString)
      }
    };
  }
});
var ridesSchema = mongoose.Schema({
  driver: {
    userID: String,
    required: true,
    seats: {
      type: Number,
      required: true
    }
  },
  riders: {
    userID: String
  },
  comments: {
    type: String
  },
  origin: {
    type: String,
    required: [true, 'Please enter coordinates']
  },
  destination: {
    street: String,
    city: String,
    state: {
      type: String,
      enum: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
    },
    zip: {
      type: Number,
      required: [true, 'ZIP code is required']
    }
  },
  departure: {
    type: Date,
    required: true
  },
  arrival: {
    type: Date,
    required: true
  },
  currentLocation: {
    type: String,
    required: true
  },
  departed: {
    type: String,
    required: true
  }
}); // ridesSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

var Rides = mongoose.model('Rides', ridesSchema);
module.exports = {
  Rides: Rides,
  RidesType: RidesType
};
//# sourceMappingURL=Rides.js.map