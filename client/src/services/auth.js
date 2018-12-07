import { post, get } from './requests';

const AUTH_API = '/api/users';

export const signupRequest = ({ email, password }) => {
  return post(`${AUTH_API}/signup`, { email, password });
};

export const loginRequest = ({ email, password }) => {
  return post(`${AUTH_API}/login`, { email, password });
};

export const verifyRequest = () => {
  return get(`${AUTH_API}/verify`);
};
