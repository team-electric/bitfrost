import Vote from '../model';
import { getErrors } from '../../../testing/lib/errors';
import { mockVote } from '../../../testing/fixtures/vote';

describe('vote model', () => {

  test('validates a good model', () => {
    const data = mockVote();
    const vote = new Vote(data);
    const jsonVote = vote.toJSON();

    expect(jsonVote).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  test('requires poll and selection', () => {
    const vote = new Vote({});
    const errors = getErrors(vote.validateSync(), 2);

    expect(errors.poll.properties.message).toEqual('Path `poll` is required.');
    expect(errors.selection.properties.message).toEqual('Path `selection` is required.');
  });

});
