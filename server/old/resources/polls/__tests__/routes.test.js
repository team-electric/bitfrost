import { checkCode } from '../../../testing/lib/errors';
import { connect, disconnect, dropCollection } from '../../../lib/db';
import request from 'supertest';
import app from '../../../app';
const chance = require('chance').Chance();
import { mockPoll, mockPolls, postPoll } from '../../../testing/fixtures/poll';
import { randomVoteQuantities, randomVoteArrays, runVotes } from '../../../testing/fixtures/vote';

describe('polls routes', () => {

  let createdUser;
  let createdToken;

  beforeEach(async () => {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'jack@test.com', password: 'abcdef' })
    await request(app)
      .post('/api/users/login')
      .send({ email: 'jack@test.com', password: 'abcdef' })
      .then(res => {
        createdUser = res.body;
        createdToken = res.header['x-auth-token'];
      });

  });
  beforeAll(async () => {
    await dropCollection('polls');
    await dropCollection('votes');
  });
  afterAll(async () => await disconnect());

  test('post to /api/polls', async () => {

    const poll = mockPoll();

    await request(app)
      .post('/api/polls')
      .set('Authorization', `Bearer ${createdToken}`)
      .send(poll)
      .then(res => {
        checkCode(200)(res);
        expect(res.body).toEqual({
          ...poll,
          _id: expect.any(String),
          __v: expect.any(Number),
          choices: poll.choices.map(choice => ({ ...choice, _id: expect.any(String) }))
        })
      });
  });

  test('get to /api/polls', async () => {

    const polls = mockPolls(10);
    polls.forEach(poll => postPoll(poll, createdToken));

    await request(app)
      .get('/api/polls')
      .then(res => {
        checkCode(200)(res);
        polls.forEach(poll => {
          expect(res.body).toContainEqual({
            ...poll,
            _id: expect.any(String),
            __v: expect.any(Number),
            choices: poll.choices.map(choice => {
              return { ...choice, _id: expect.any(String) };
            })
          });
        });
      });
  });

  test('get to /api/polls/:id', async () => {

    const poll = mockPoll();
    let createdPoll;

    await request(app)
      .post('/api/polls')
      .set('Authorization', `Bearer ${createdToken}`)
      .send(poll)
      .then(({ body }) => createdPoll = body);

    await request(app)
      .get(`/api/polls/${createdPoll._id}`)
      .then(res => {
        checkCode(200)(res);
        expect(res.body).toEqual(createdPoll)
    });
  });

});
