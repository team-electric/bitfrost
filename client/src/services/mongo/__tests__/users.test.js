// import { getPeople } from '../people';

describe('pollApi routes', () => {

  test('asdfasdf', () => {
    expect(true).toBe(true);
  });


});

// import { getPolls, getPoll, getResults, postPoll, postVote } from '../polls';
// import mockGetPolls from '../../testing/fixtures/getPolls.json';
// import mockGetPoll from '../../testing/fixtures/getPoll.json';
// import mockPostVote from '../../testing/fixtures/postVote.json';
// import mockPostPoll from '../../testing/fixtures/postPoll.json';
// import mockGetResults from '../../testing/fixtures/getResults.json';

// jest.mock('../requests.js', () => ({
//   get: url => {
//     if(url.startsWith('/api/polls/') && url.endsWith('results')) return Promise.resolve(mockGetResults);
//     if(url.startsWith('/api/polls/')) return Promise.resolve(mockGetPoll);
//     if(url.startsWith('/api/polls')) return Promise.resolve(mockGetPolls);
//     else return Promise.reject({ error: '404' });
//   },
//   post: url => {
//     if(url.startsWith('/api/polls/')) return Promise.resolve(mockPostVote);
//     if(url.startsWith('/api/polls')) return Promise.resolve(mockPostPoll);
//     else return Promise.reject({ error: '404' });
//   }
// }));

// describe('pollApi routes', () => {

//   describe('get /polls', () => {

//     test('returns an array of polls', () => {
//       getPolls()
//         .then(polls => {
//           expect(polls).toHaveLength(1);
//           expect(polls).toContainEqual({
//             __v: expect.any(Number),
//             _id: expect.any(String),
//             title: expect.any(String),
//             description: expect.any(String),
//             choices: [
//               { _id: expect.any(String), description: expect.any(String) },
//               { _id: expect.any(String), description: expect.any(String) },
//               { _id: expect.any(String), description: expect.any(String) },
//               { _id: expect.any(String), description: expect.any(String) }
//             ]
//           });
//         });
//     });

//   });

//   describe('get /polls/:id', () => {

//     test('returns a single poll object', () => {

//       const id = '5c061a9411547d6e55aa426b';

//       getPoll(id)
//         .then(poll => {
//           expect(poll).toEqual({
//             __v: expect.any(Number),
//             _id: expect.any(String),
//             title: expect.any(String),
//             description: expect.any(String),
//             choices: [
//               { _id: expect.any(String), description: expect.any(String) },
//               { _id: expect.any(String), description: expect.any(String) },
//               { _id: expect.any(String), description: expect.any(String) },
//               { _id: expect.any(String), description: expect.any(String) }
//             ]
//           });
//         });
//     });
//   });


//   describe('post /polls', () => {

//     test('posts a poll to server', () => {

//       const poll = {
//         title: 'which is best',
//         description: 'this is about bears',
//         choices: [{ description: 'black bear' }, { description: 'brown bear' }]
//       };

//       postPoll(poll)
//         .then(poll => expect(poll).toEqual({
//           ...poll,
//           __v: expect.any(Number),
//           _id: expect.any(String)
//         }));
//     });

//   });

//   describe('post /polls/:id/votes', () => {

//     test('posts a vote to server', () => {

//       const poll = '5c07d9dd5d9bd614a2c9ce4f';
//       const selection = '5c07d9dd5d9bd614a2c9ce50';

//       postVote({ poll, selection })
//         .then(vote => expect(vote).toEqual({
//           ...vote,
//           __v: expect.any(Number),
//           _id: expect.any(String)
//         }));
//     });

//   });

//   describe('get /polls/:id/results', () => {

//     test('gets poll results from server', () => {

//       const id = '5c07d82ce1eebd0dec09f51a';

//       getResults(id)
//         .then(results => {
//           expect(results).toContainEqual({ _id: expect.any(String), count: expect.any(Number) });
//           expect(results).toHaveLength(4);
//         });

//     });
//   });

// });
