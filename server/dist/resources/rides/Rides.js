// const mongoose = require('mongoose');
// const {
//   GraphQLObjectType,
//   // GraphQLID,
//   GraphQLNonNull,
//   GraphQLString,
//   GraphQLInt,
// } = require('graphql');
// const RidesType = new GraphQLObjectType({
//   name: 'Rides',
//   description: 'Rides info',
//   fields: () => ({
//     driver: { type: new GraphQLNonNull(GraphQLString) },
//     riders: { type: GraphQLString },
//     comments: { type: GraphQLString },
//     origin: { type: new GraphQLNonNull(GraphQLString) },
//     destination: {
//       street: { type: GraphQLString },
//       city: { type: GraphQLString },
//       state: { type: GraphQLString },
//       zip: { type: new GraphQLNonNull(GraphQLInt) },
//       formatted: {
//         type: GraphQLString,
//         resolve(obj) {
//           return obj.street + obj.city + obj.state + obj.zip
//         }
//       }
//     },
//     departure: { type: new GraphQLNonNull(GraphQLInt) },
//     arrival: { type: new GraphQLNonNull(GraphQLInt) },
//     currentLocation: { type: new GraphQLNonNull(GraphQLString) },
//     departed: { type: new GraphQLNonNull(GraphQLString) }
//   })
// });
// const ridesSchema = mongoose.Schema({
//   driver: {
//     userID: String,
//     required: true,
//     seats: {
//       type: Number,
//       required: true
//     }
//   },
//   riders: {
//     userID: String,
//   },
//   comments: {
//     type: String
//   },
//   origin: {
//     type: String,
//     required: [true, 'Please enter coordinates' ]
//   },
//   destination: {
//     street: String,
//     city: String,
//     state: {
//         type: String,
//         enum: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
//     },
//     zip: {
//         type: Number,
//         required: [true, 'ZIP code is required'],
//     },
//   },
//   departure: {
//     type: Date,
//     required: true
//   },
//   arrival: {
//     type: Date,
//     required: true
//   },
//   currentLocation: {
//     type: String,
//     required: true
//   },
//   departed: {
//     type: String,
//     required: true
//   }
// });
// // ridesSchema.methods.graphql = function() {
// //   // do some graphql manipulation
// // }
// const Rides = mongoose.model('Rides', ridesSchema);
// module.exports = {
//   Rides,
//   RidesType
// }
"use strict";
//# sourceMappingURL=Rides.js.map