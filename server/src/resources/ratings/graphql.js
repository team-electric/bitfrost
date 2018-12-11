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
    rater: { type: new GraphQLNonNull(GraphQLString) },
    ratee: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLEnumType) },
    rides: { type: new GraphQLNonNull(GraphQLEnumType) },
  })
});
