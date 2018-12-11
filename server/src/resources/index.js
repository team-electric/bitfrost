import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userQueries, userMutations } from './users/graphql';
import { rideQueries, rideMutations } from './rides/graphql';
import { ratingQueries, ratingMutations } from './ratings/graphql';
import { carQueries, carMutations } from './cars/graphql';

const Queries = new GraphQLObjectType({
  name: 'RootQueries',
  description: 'My root queries',
  fields: () => ({
    ...userQueries,
    ...rideQueries,
    ...ratingQueries,
    ...carQueries,
  })
});

const Mutations = new GraphQLObjectType({
  name: 'RootMutations',
  description: 'Root mutations',
  fields: () => ({
    ...userMutations,
    ...rideMutations,
    ...ratingMutations,
    ...carMutations,
  })
});

const Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});

export default Schema;
