const request = require('../graphql');

import allUsers from './allUsers';
export const getUsers = () => request(allUsers);

import newUser from './newUser';
export const createUser = user => request(newUser(user));
