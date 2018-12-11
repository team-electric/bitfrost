import mongoose from 'mongoose';

const rideSchema = mongoose.Schema({
  driver: {
    userID: String,
    required: true,
    seats: {
      type: Number,
      required: true
    }
  },
  riders: {
    userID: String,
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
      type: Number,
      required: [true, 'ZIP code is required'],
    },
  },
  departure: {
    type: Date,
    required: true
  },
  arrival: {
    type: Date,
    required: true
  },
  currentLocation: {
    type: String,
    required: true
  },
  departed: {
    type: String,
    required: true
  }
});

// ridesSchema.methods.graphql = function() {
//   // do some graphql manipulation
// }

export const Ride = mongoose.model('Ride', rideSchema);
