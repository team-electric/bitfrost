const { User, UserType } = require('./users');
const { prepareMongooseDoc } = require('../lib/graphql');
const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLID
} = require('graphql');

const prepareObj = obj => {
  if (typeof obj.graphql === 'function') return obj.graphql();

  return prepareMongooseDoc(obj);
}

const prepare = obj => {
  if (Array.isArray(obj)) return obj.map(prepareObj);
  return prepareObj(obj);
};

const Queries = new GraphQLObjectType({
  name: 'RootQueries',
  description: 'My root queries',
  fields: () => ({
    user: {
      description: 'retrieves a user',
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => User.findById(id).then(prepare)
    },
    people: {
      description: 'retrieves a list of people',
      type: new GraphQLList(UserType),
      resolve: () => User.find().then(prepare)
    }
  })
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Root mutations',
  fields: () => ({
    createUser: {
      description: 'Create a new user',
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
      },
      resolve: (_, { name, email, phone }) => User.create({ name, email, phone }).then(prepare)
    }
  })
});

const Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});

module.exports = Schema;
