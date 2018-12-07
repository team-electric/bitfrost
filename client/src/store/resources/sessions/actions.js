import { signupRequest, loginRequest, verifyRequest } from '../../../services/auth';

export const SESSION_CREATE = 'SESSION_CREATE';
export const SESSION_LOADING = 'SESSION_LOADING';
export const SESSION_LOADED = 'SESSION_LOADED';
export const SESSION_ERROR = 'SESSION_ERROR';

export const signup = ({ email, password }) => ({
  type: SESSION_CREATE,
  payload: signupRequest({ email, password })
});


export const login = ({ email, password }) => ({
  type: SESSION_CREATE,
  payload: loginRequest({ email, password })
});

export const refreshSession = () => ({
  type: SESSION_CREATE,
  loadStart: SESSION_LOADING,
  loadEnd: SESSION_LOADED,
  errorType: SESSION_ERROR,
  payload: verifyRequest()
});

export const SESSION_TOKEN = 'SESSION_TOKEN';
export const updateSessionToken = token => ({
  type: SESSION_TOKEN,
  payload: token
});
