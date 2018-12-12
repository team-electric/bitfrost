import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { prepare } from '../../lib/graphql';
import { Rating } from './mongoose';
import ObjectId from '../../lib/graphql/resolvers/objectId';


const RatingType = new GraphQLObjectType({
  name: 'Rating',
  description: 'Rating info',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    ride: { type: new GraphQLNonNull(ObjectId) },
    driver: { type: new GraphQLNonNull(ObjectId) },
    rider: { type: new GraphQLNonNull(ObjectId) },
    rater: { type: new GraphQLNonNull(ObjectId) },
    value: { type: new GraphQLNonNull(GraphQLInt) },
  })
});

export const ratingQueries = {
  rating: {
    description: 'retrieves a rating',
    type: RatingType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => Rating.findById(id).then(prepare)
  },
  ratings: {
    description: 'retrieves a list of ratings',
    type: new GraphQLList(RatingType),
    resolve: () => Rating.find().then(prepare),
  }
}

export const ratingMutations = {
  createRating: {
    description: 'Create a new rating',
    type: RatingType,
    args: {
      ride: { type: new GraphQLNonNull(ObjectId) },
      driver: { type: new GraphQLNonNull(ObjectId) },
      rider: { type: new GraphQLNonNull(ObjectId) },
      rater: { type: new GraphQLNonNull(ObjectId) },
      value: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (_, {
      ride,
      driver,
      rider,
      rater,
      value,
    }) => Rating.create({
      ride,
      driver,
      rider,
      rater,
      value,
    }).then(prepare)
  }
}
