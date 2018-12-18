import { Ride } from '../mongoose';
import { getErrors } from '../../../testing/lib/errors';
import { Types } from 'mongoose';

describe('ride model', () => {

  test('validates a good model', () => {
    const data = {
      driver: Types.ObjectId(),
      riders: [Types.ObjectId()],
      seats: 3,
      comments: 'asdf',
      origin: '144N, 44W',
      destination: {
        zip: '97220'
      },
      depart: Date.parse('2018-12-18T22:16:13.445Z'),
      arrive: Date.parse('2018-12-18T23:16:13.445Z'),
    };
    const ride = new Ride(data);
    const jsonRide = ride.toJSON();

    expect(jsonRide).toEqual({
      ...data,
      _id: expect.any(Object),
      depart: new Date(data.depart),
      arrive: new Date(data.arrive),
    });
  });

  test('requires userId and seats', () => {
    const ride = new Ride({});
    const errors = getErrors(ride.validateSync(), 6);

    expect(errors.driver.properties.message).toEqual('Path `driver` is required.');
    expect(errors.seats.properties.message).toEqual('Path `seats` is required.');
    expect(errors.origin.properties.message).toEqual('Please enter coordinates');
    expect(errors['destination.zip'].properties.message).toEqual('ZIP code is required');
    expect(errors.depart.properties.message).toEqual('Path `depart` is required.');
    expect(errors.arrive.properties.message).toEqual('Path `arrive` is required.');
  });


});
