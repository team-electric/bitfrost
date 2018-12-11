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
    userId: { type: new GraphQLNonNull(GraphQLString) },
    seats: { type: new GraphQLNonNull(GraphQLInt) },
    plate: { type: new GraphQLNonNull(GraphQLString) },
    make: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export const carQueries = {
  car: {
    description: 'retrieves a car',
    type: CarType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => Car.findById(id).then(prepare)
  },
  cars: {
    description: 'retrieves a list of cars',
    type: new GraphQLList(CarType),
    resolve: () => Car.find().then(prepare),
  }
}

export const carMutations = {
  createCar: {
    description: 'Create a new car',
    type: CarType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLString) },
      seats: { type: new GraphQLNonNull(GraphQLInt) },
      plate: { type: new GraphQLNonNull(GraphQLString) },
      make: { type: new GraphQLNonNull(GraphQLString) },
      model: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_, {
      userId,
      seats,
      plate,
      make,
      model,
    }) => Car.create({
      userId,
      seats,
      plate,
      make,
      model,
    }).then(prepare)
  }
}
