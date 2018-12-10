const { Person, PersonType } = require('./people/People');
const { prepareMongooseDoc } = require('../lib/graphql');
const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt
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
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        address: {
          street: { type: GraphQLString },
          city: { type: GraphQLString },
          state: { type: GraphQLString },
          zip: { type: new GraphQLNonNull(GraphQLInt) },
          formatted: {
            type: GraphQLString,
            resolve(obj) {
              return obj.street + obj.city + obj.state + obj.zip
            }
          }
        },
      },
      resolve: (_, { name, email, phone, address }) => Person.create({ name, email, phone, address }).then(prepare)
    }
  })
});

const Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});

module.exports = Schema;
