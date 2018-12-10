"use strict";

var mongoose = require('mongoose');

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLID = _require.GraphQLID,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLInt = _require.GraphQLInt,
    GraphQLString = _require.GraphQLString;

var UserType = new GraphQLObjectType({
  name: 'Person',
  description: 'A person',
  fields: function fields() {
    return {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      phone: {
        type: new GraphQLNonNull(GraphQLString)
      },
      address: {
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
      }
    };
  }
});
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
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
  }
}); // userSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

var User = mongoose.model('User', userSchema);
module.exports = {
  User: User,
  UserType: UserType
};
//# sourceMappingURL=users.js.map