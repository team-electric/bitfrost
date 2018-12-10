import User from '../model';
import { getErrors } from '../../../testing/lib/errors';

describe('user model', () => {

  test('validates a good model', () => {
    const data = {
      email: 'jack@test.com'
    };
    const user = new User(data);
    const jsonUser = user.toJSON();

    expect(jsonUser).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  test('requires email', () => {
    const vote = new User({});
    const errors = getErrors(vote.validateSync(), 1);

    expect(errors.email.properties.message).toEqual('Path `email` is required.');
  });

});
