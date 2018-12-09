const { Person, PersonType } = require('./people/model');
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
    person: {
      description: 'retrieves a person',
      type: PersonType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => Person.findById(id).then(prepare)
    },
    people: {
      description: 'retrieves a list of people',
      type: new GraphQLList(PersonType),
      resolve: () => Person.find().then(prepare)
    }
  })
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Root mutations',
  fields: () => ({
    createPerson: {
      description: 'Create a new person',
      type: PersonType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: GraphQLString },
        status: { type: GraphQLString }
      },
      resolve: (_, { name, birthday, status }) => Person.create({ name, birthday, status }).then(prepare)
    }
  })
});

const Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});

module.exports = Schema;
