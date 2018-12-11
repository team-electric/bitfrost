// import request from 'superagent';
const request = require('superagent');
// import { query } from './requests';

const queryUsers = `
query {
  user {
    name
  }
}
`;

const createUser = `
mutation {
  users(
    name:'jack', email:'jack@example.com',
  ) {
    name
    email
    phone
  }
}
`;



// export const getUsers = query('http://localhost:7890/graphql', { query: queryUsers })
//   .then(res => console.log(res.body.data.users))
//   .catch(err => console.error(err.response.body));

request
  .get('http://localhost:7890/graphql')
  .query({ query: queryUsers })
  .send()
  .then(res => console.log(res.body.data.users))
  .catch(err => console.error(err.response.body));
