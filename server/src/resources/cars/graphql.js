import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { prepare } from '../../lib/graphql';
import { Car } from './mongoose';
import ObjectId from '../../lib/graphql/resolvers/objectId';


const CarType = new GraphQLObjectType({
  name: 'Car',
  description: 'A Car',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: ObjectId },
    seats: { type: new GraphQLNonNull(GraphQLInt) },
    plate: { type: GraphQLString },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
  })
});

export const carQueries = {
  car: {
    description: 'retrieves a car',
    type: CarType,
    args: { userId: { type: ObjectId } },
    resolve: (_, { userId }) => Car.findOne({ userId }).then(prepare)
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
      userId: { type: new GraphQLNonNull(GraphQLID) },
      seats: { type: new GraphQLNonNull(GraphQLInt) },
      plate: { type: GraphQLString },
      make: { type: GraphQLString },
      model: { type: GraphQLString },
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
