import { model, Schema } from 'mongoose';

const rideSchema = Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  riders: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  seats: {
    type: Number,
    required: true
  },
  comments: {
    type: String
  },
  origin: {
    type: String,
    required: [true, 'Please enter coordinates']
  },
  destination: {
    street: String,
    city: String,
    state: {
      type: String,
      enum: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
    },
    zip: {
      type: String,
      required: [true, 'ZIP code is required'],
    },
  },
  depart: {
    type: Date,
    required: true
  },
  arrive: {
    type: Date,
    required: true
  },
});

// Note on riders:

// Ride
//   .find()
//   .populate('riders')

// ridesSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

export const Ride = model('Ride', rideSchema);
