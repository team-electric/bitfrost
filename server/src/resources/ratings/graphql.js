import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType
} from 'graphql';
import { prepare } from '../../lib/graphql';
import { Rating } from './mongoose';

const RatingType = new GraphQLObjectType({
  name: 'Rating',
  description: 'Rating info',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    ride: { type: new GraphQLNonNull(GraphQLString) },
    driver: { type: new GraphQLNonNull(GraphQLString) },
    rider: { type: new GraphQLNonNull(GraphQLString) },
    rater: { type: new GraphQLNonNull(GraphQLString) },
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
      ride: { type: new GraphQLNonNull(GraphQLString) },
      driver: { type: new GraphQLNonNull(GraphQLString) },
      rider: { type: new GraphQLNonNull(GraphQLString) },
      rater: { type: new GraphQLNonNull(GraphQLString) },
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
