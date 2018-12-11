import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { prepare } from '../../lib/graphql';
import { Rating } from './mongoose';

const RatingType = new GraphQLObjectType({
  name: 'Rating',
  description: 'Rating info',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    ride: { type: new GraphQLNonNull(GraphQLID) },
    driver: { type: new GraphQLNonNull(GraphQLID) },
    rider: { type: new GraphQLNonNull(GraphQLID) },
    rater: { type: new GraphQLNonNull(GraphQLID) },
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
      ride: { type: new GraphQLNonNull(GraphQLID) },
      driver: { type: new GraphQLNonNull(GraphQLID) },
      rider: { type: new GraphQLNonNull(GraphQLID) },
      rater: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_, {
      ride,
      driver,
      rider,
      rater,
    }) => Rating.create({
      ride,
      driver,
      rider,
      rater,
    }).then(prepare)
  }
}
