import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';
import { prepare } from '../../lib/graphql';
import { User } from './mongoose';
import ObjectId from '../../lib/graphql/resolvers/objectId';

const AddressType = new GraphQLObjectType({
  name: 'Address',
  description: 'An address',
  fields: () => ({
    _id: { type: new GraphQLNonNull(ObjectId) },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: new GraphQLNonNull(GraphQLString) },
    formatted: {
      type: GraphQLString,
      resolve(obj) {
        return `
          ${obj.street}
          ${obj.city}, ${obj.state} ${obj.zip}
        `;
      }
    }
  })
});

const AddressInputType = new GraphQLInputObjectType({
  name: 'AddressInput',
  description: 'An address',
  fields: () => ({
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    _id: { type: new GraphQLNonNull(ObjectId) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: AddressType }
  })
});

export const userQueries = {
  user: {
    description: 'retrieves a user',
    type: UserType,
    args: {
      id: { type: GraphQLID }
    },
    resolve: (_, { id }) => User.findById(id).then(prepare)
  },
  userByEmail: {
    description: 'retrieves a user',
    type: UserType,
    args: {
      email: { type: GraphQLString }
    },
    resolve: (_, { email }) => User.findOne({ email }).then(prepare)
  },
  users: {
    description: 'retrieves a list of users',
    type: new GraphQLList(UserType),
    resolve: () => User.find().then(prepare)
  }
};

export const userMutations = {
  createUser: {
    description: 'Create a new user',
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      address: { type: AddressInputType }
    },
    resolve: (_, { name, email, phone, address }) =>
      User.create({
        name,
        email,
        phone,
        address
      }).then(prepare)
  },
  updateUser: {
    description: 'Update a new user',
    type: UserType,
    args: {
      _id: { type: ObjectId },
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      address: { type: AddressInputType }
    },
    resolve: (_, { _id, name, email, phone, address }) =>
      User.findOneAndUpdate(
        {
          _id
        },
        {
          name,
          email,
          phone,
          address
        },
        {
          new: true
        }
      ).then(prepare)
  }
};
