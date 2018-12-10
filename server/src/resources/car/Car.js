const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const CarType = new GraphQLObjectType ({
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

const carSchema = mongoose.Schema({
  plate: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = {
  Car,
  CarType
}
