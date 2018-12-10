"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('graphql-yoga'),
    GraphQLServer = _require.GraphQLServer;

var Mutation = require('./resolvers/Mutation');

var Query = require('./resolvers/Query');

var db = require('./db'); // Create the GraphQL Yoga Server


function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation: Mutation,
      Query: Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: function context(req) {
      return _objectSpread({}, req, {
        db: db
      });
    }
  });
}

module.exports = createServer;
//# sourceMappingURL=createServer.js.map