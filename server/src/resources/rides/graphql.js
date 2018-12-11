import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';
import { prepare } from '../../lib/graphql';
import { Ride } from './mongoose';

const DestinationType = new GraphQLObjectType({
  name: 'Destination',
  description: 'An destination',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: new GraphQLNonNull(GraphQLString) },
    formatted: {
      type: GraphQLString,
      resolve(obj) {
        return obj.street + obj.city + obj.state + obj.zip
      }
    }
  })
});

const DestinationInputType = new GraphQLInputObjectType({
  name: 'DestinationInput',
  description: 'An destination',
  fields: () => ({
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const RideType = new GraphQLObjectType({
  name: 'Rides',
  description: 'Rides info',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    driver: { type: new GraphQLNonNull(GraphQLString) },
    riders: { type: GraphQLString },
    seats: { type: GraphQLInt },
    comments: { type: GraphQLString },
    origin: { type: new GraphQLNonNull(GraphQLString) },
    destination: { type: DestinationType },
    depart: { type: new GraphQLNonNull(GraphQLString) },
    arrive: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export const rideQueries = {
  ride: {
    description: 'retrieves a ride',
    type: RideType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => Ride.findById(id).then(prepare)
  },
  rides: {
    description: 'retrieves a list of rides',
    type: new GraphQLList(RideType),
    resolve: () => Ride.find().then(prepare),
  }
}

export const rideMutations = {
  createRide: {
    description: 'Create a new ride',
    type: RideType,
    args: {
      driver: { type: new GraphQLNonNull(GraphQLString) },
      riders: { type: GraphQLString },
      seats: { type: GraphQLInt },
      comments: { type: GraphQLString },
      origin: { type: new GraphQLNonNull(GraphQLString) },
      destination: { type: DestinationInputType },
      depart: { type: new GraphQLNonNull(GraphQLString) },
      arrive: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, {
      driver,
      riders,
      seats,
      comments,
      origin,
      destination,
      depart,
      arrive,
    }) => Ride.create({
      driver,
      riders,
      seats,
      comments,
      origin,
      destination,
      depart,
      arrive,
    }).then(prepare)
  }
}
