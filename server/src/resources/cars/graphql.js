import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { prepare } from '../../lib/graphql';
import { Car } from './mongoose';

const CarType = new GraphQLObjectType({
  name: 'Car',
  description: 'A Car',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    plate: { type: new GraphQLNonNull(GraphQLString) },
    make: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    seats: { type: new GraphQLNonNull(GraphQLInt) },
    userID: { type: new GraphQLNonNull(GraphQLString) },
  })
});
