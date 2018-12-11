import { request } from './index';

const allUsers = JSON.stringify({
  query:
    `query {
      users{
        _id
        name
        email
        phone
      }
    }`
});
export const getUsers = () => request(allUsers);

const newUser = user => JSON.stringify({
  query:
    `mutation {
      createUser(
        name: "${user.name}"
        email: "${user.email}"
        phone: "${user.phone}"
        address: {
          zip: "${user.address.zip}"
        }
      )
      {
        _id
        name
        email
        phone
        address {
          street
          city
          state
          zip
        }
      }
    }`
});
export const createUser = user => request(newUser(user));

// import userById from './userById';
// export const getUser = id => request(userById(id));

// import changeUser from './changeUser';
// export const updateUser = user => request(changeUser(user));
