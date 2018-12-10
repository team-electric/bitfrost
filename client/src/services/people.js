// import request from 'superagent';
const request = require('superagent');


// const request = (url, method, body) => {
//   return fetch(url, {
//     method,
//     headers: {
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(body)
//   })
//     .then(res => [res.ok, res.headers, res.json()])
//     .then(([ok, headers, json]) => {
//       if (!ok) throw new Error('Failed request');
//       return [headers, json];
//     })
//     .then(([headers, json]) => {
//       const newToken = headers.get('X-AUTH-TOKEN');
//       if (newToken && newToken !== token) setToken(newToken);
//       return json;
//     });
// };

const query = `
query {
  people {
    name
    birthday
  }
}
`;


request
  .get('http://localhost:7890/graphql')
  .query({ query })
  .send()
  .then(res => console.log(res.body))
  .catch(err => console.error(err.response.body));
