import { Router } from 'express';
import polls from './polls/routes';
import users from './users/routes';
import votes from './votes/routes';

const resources = [
  polls, users, votes
];

export default Router().use('/', ...resources);
