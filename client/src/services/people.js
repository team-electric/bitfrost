// import request from 'superagent';
// const request = require('superagent');
import { query } from './requests';

const queryPeople = `
query {
  people {
    name
    birthday
  }
}
`;

export const getPeople = query('http://localhost:7890/graphql', { query: queryPeople })
  .then(res => console.log(res.body.data.people))
  .catch(err => console.error(err.response.body));

// request
//   .get('http://localhost:7890/graphql')
//   .query({ query })
//   .send()
//   .then(res => console.log(res.body.data.people))
//   .catch(err => console.error(err.response.body));
