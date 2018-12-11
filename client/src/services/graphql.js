// const fetch = require('node-fetch');

const GRAPHQL_API = '/graphql?';



// auth stuff to add:

// let token = window.localStorage.getItem('token');
// const setToken = newToken => {
//   token = newToken;
//   window.localStorage.setItem('token', newToken);
// };

const request = async(body) => {

  const response = await fetch(
    GRAPHQL_API,
    {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: body,
    });

  const responseJson = await response.json();
  return responseJson.data;
};

export default request;
