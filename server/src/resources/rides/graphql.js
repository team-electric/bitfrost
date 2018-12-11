import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { prepare } from '../../lib/graphql';
import { Ride } from './mongoose';

const RideType = new GraphQLObjectType({
  name: 'Rides',
  description: 'Rides info',
  fields: () => ({
    driver: { type: new GraphQLNonNull(GraphQLString) },
    riders: { type: GraphQLString },
    comments: { type: GraphQLString },
    origin: { type: new GraphQLNonNull(GraphQLString) },
    destination: {
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
    departure: { type: new GraphQLNonNull(GraphQLInt) },
    arrival: { type: new GraphQLNonNull(GraphQLInt) },
    currentLocation: { type: new GraphQLNonNull(GraphQLString) },
    departed: { type: new GraphQLNonNull(GraphQLString) }
  })
});
