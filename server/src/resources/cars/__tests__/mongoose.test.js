import { Car } from '../mongoose';
import { getErrors } from '../../../testing/lib/errors';
import { Types } from 'mongoose';
const chance = require('chance').Chance();

describe('car model', () => {

  test('validates a good model', () => {
    const data = {
      userId: Types.ObjectId(),
      seats: 4,
      plate: 'abc1234',
      make: 'Yota',
      model: 'Tacoma'
    };
    const car = new Car(data);
    const jsonCar = car.toJSON();

    expect(jsonCar).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  test('requires userId and seats', () => {
    const car = new Car({});
    const errors = getErrors(car.validateSync(), 2);

    expect(errors.userId.properties.message).toEqual('Path `userId` is required.');
    expect(errors.seats.properties.message).toEqual('Path `seats` is required.');
  });


});
