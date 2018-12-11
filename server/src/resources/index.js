import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userQueries, userMutations } from './users/graphql';

const Queries = new GraphQLObjectType({
  name: 'RootQueries',
  description: 'My root queries',
  fields: () => ({
    ...userQueries,
    // ...ridesQueries
  })
});

const Mutations = new GraphQLObjectType({
  name: 'RootMutations',
  description: 'Root mutations',
  fields: () => ({
    ...userMutations
  })
});

const Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});

export default Schema;
