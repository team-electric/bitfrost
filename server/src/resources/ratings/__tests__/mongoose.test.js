import { Rating } from '../mongoose';
import { getErrors } from '../../../testing/lib/errors';
import { Types } from 'mongoose';

describe('rating model', () => {

  test('validates a good model', () => {
    const data = {
      ride: Types.ObjectId(),
      driver: Types.ObjectId(),
      rider: Types.ObjectId(),
      rater: Types.ObjectId(),
      value: 4
    };
    const rating = new Rating(data);
    const jsonRating = rating.toJSON();

    expect(jsonRating).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  test('requires userId and seats', () => {
    const rating = new Rating({});
    const errors = getErrors(rating.validateSync(), 5);

    expect(errors.ride.properties.message).toEqual('Path `ride` is required.');
    expect(errors.driver.properties.message).toEqual('Path `driver` is required.');
    expect(errors.rider.properties.message).toEqual('Path `rider` is required.');
    expect(errors.rater.properties.message).toEqual('Path `rater` is required.');
    expect(errors.value.properties.message).toEqual('Path `value` is required.');
  });


});
