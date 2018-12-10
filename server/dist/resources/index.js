"use strict";

var _require = require('./users'),
    User = _require.User,
    UserType = _require.UserType;

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
      user: {
        description: 'retrieves a user',
        type: UserType,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: function resolve(_, _ref) {
          var id = _ref.id;
          return User.findById(id).then(prepare);
        }
      },
      people: {
        description: 'retrieves a list of people',
        type: new GraphQLList(UserType),
        resolve: function resolve() {
          return User.find().then(prepare);
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
      createUser: {
        description: 'Create a new user',
        type: UserType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: GraphQLString
          },
          phone: {
            type: GraphQLString
          }
        },
        resolve: function resolve(_, _ref2) {
          var name = _ref2.name,
              email = _ref2.email,
              phone = _ref2.phone;
          return User.create({
            name: name,
            email: email,
            phone: phone
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
//# sourceMappingURL=index.js.map