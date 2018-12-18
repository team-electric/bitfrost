export const graphqlReq = apiUrl => async(body) => {

  const response = await fetch(
    apiUrl,
    {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: body,
    });

  const responseJson = await response.json();
  return responseJson.data;
};



// What is this token used for? It doesn't seem to
// fit your authentication strategy.
let token = window.localStorage.getItem('token');

const setToken = newToken => {
  token = newToken;
  window.localStorage.setItem('token', newToken);
};

export const restReq = (url, method, body) => {
  return fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(res => [res.ok, res.headers, res.json()])
    .then(([ok, headers, json]) => {
      if (!ok) throw new Error('Failed request');
      return [headers, json];
    })
    .then(([headers, json]) => {
      const newToken = headers.get('X-AUTH-TOKEN');
      if (newToken && newToken !== token) setToken(newToken);
      return json;
    });
};


export const get = (url) => restReq(url, 'GET');

export const post = (url, body) => restReq(url, 'POST', body);
