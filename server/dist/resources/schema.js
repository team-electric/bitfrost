"use strict";

var _require = require('./people/People'),
    Person = _require.Person,
    PersonType = _require.PersonType;

var _require2 = require('../lib/graphql'),
    prepareMongooseDoc = _require2.prepareMongooseDoc;

var _require3 = require('graphql'),
    GraphQLNonNull = _require3.GraphQLNonNull,
    GraphQLObjectType = _require3.GraphQLObjectType,
    GraphQLInputObjectType = _require3.GraphQLInputObjectType,
    GraphQLList = _require3.GraphQLList,
    GraphQLSchema = _require3.GraphQLSchema,
    GraphQLString = _require3.GraphQLString,
    GraphQLID = _require3.GraphQLID;

var prepareObj = function prepareObj(obj) {
  if (typeof obj.graphql === 'function') return obj.graphql();
  return prepareMongooseDoc(obj);
};

var prepare = function prepare(obj) {
  if (Array.isArray(obj)) return obj.map(prepareObj);
  return prepareObj(obj);
};

var Queries = new GraphQLObjectType({
  name: 'RootQueries',
  description: 'My root queries',
  fields: function fields() {
    return {
      person: {
        description: 'retrieves a person',
        type: PersonType,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: function resolve(_, _ref) {
          var id = _ref.id;
          return Person.findById(id).then(prepare);
        }
      },
      people: {
        description: 'retrieves a list of people',
        type: new GraphQLList(PersonType),
        resolve: function resolve() {
          return Person.find().then(prepare);
        }
      }
    };
  }
});
var Mutations = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Root mutations',
  fields: function fields() {
    return {
      createPerson: {
        description: 'Create a new person',
        type: PersonType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          birthday: {
            type: GraphQLString
          },
          status: {
            type: GraphQLString
          }
        },
        resolve: function resolve(_, _ref2) {
          var name = _ref2.name,
              birthday = _ref2.birthday,
              status = _ref2.status;
          return Person.create({
            name: name,
            birthday: birthday,
            status: status
          }).then(prepare);
        }
      }
    };
  }
});
var Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});
module.exports = Schema;
//# sourceMappingURL=schema.js.map