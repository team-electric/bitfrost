const request = require('superagent');
const { Person } = require('./src/resources/people/model');


const query = `
query getCharacter($rickId: ID!, $mortyId: ID!, $summerId: ID!) {
  morty: character(id:$mortyId) {
    ...characterField
  }
  rick: character(id:$rickId) {
    ...characterField
  }
  summer: character(id:$summerId) {
    ...characterField
  }
}

fragment characterField on Character {
  id
  name
	species
  gender
}
`

const variables = JSON.stringify({
  rickId: 1,
  mortyId: 2,
  summerId: 3
});

request
  .get('https://rickandmortyapi.com/graphql/')
  .query({ query, variables })
  .send()
  .then(res => {
    console.log(res.body);
  })
  .catch(err => console.error(err.response.body))
