const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'A person',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: GraphQLString },
    status: { type: GraphQLString }
  })
});

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthday: {
  type: String,
  },
  status: {
    type: String,
    default: 'Alive'
  }
});

// personSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

const Person = mongoose.model('Person', personSchema);

module.exports = {
  Person,
  PersonType
};
