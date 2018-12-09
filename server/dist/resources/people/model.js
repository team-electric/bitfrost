"use strict";

var mongoose = require('mongoose');

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLID = _require.GraphQLID,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLString = _require.GraphQLString;

var PersonType = new GraphQLObjectType({
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
      birthday: {
        type: GraphQLString
      },
      status: {
        type: GraphQLString
      }
    };
  }
});
var personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthday: {
    type: String
  },
  status: {
    type: String,
    default: 'Alive'
  }
}); // personSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

var Person = mongoose.model('Person', personSchema);
module.exports = {
  Person: Person,
  PersonType: PersonType
};
//# sourceMappingURL=model.js.map