import app from '../../app';
import request from 'supertest';
import { Types } from 'mongoose';
const chance = require('chance').Chance();

export const mockVote = () => ({
  poll: Types.ObjectId(),
  selection: Types.ObjectId()
});

const vote = (poll, i) => ({
  poll: poll._id,
  selection: poll.choices[i]._id
});

const sendVote = (poll, vote, token) => {
  return request(app)
    .post(`/api/polls/${poll._id}/votes`)
    .set('Authorization', `Bearer ${token}`)
    .send(vote);
};

export const randomVoteQuantities = length => Array(length)
  .fill()
  .map(() => chance.natural({ min: 1, max: 20 }));

export const randomVoteArrays = (quantities, poll) => quantities.map((quantity, i) => {
  const id = poll.choices[i]._id;
  return Array(quantity).fill(poll.choices[i]._id);
});

export const runVotes = (poll, voteArrays, token) => {
  return voteArrays.forEach((array, index) => {
    array.forEach(async () => {
      const voteToSend = vote(poll, index);
      await sendVote(poll, voteToSend, token);
    })
  })
}
