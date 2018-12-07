import app from '../../../app';
import request from 'supertest';
import { connect, disconnect, dropCollection } from '../../../lib/db'
import { tokenize } from '../../../lib/auth';

describe('auth routes', () => {

  beforeAll(async () => {
    await connect();
    await dropCollection('users');
  });

  afterAll(async () => {
    await disconnect();
  });


  it('creates a user', () => {
    return request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: '1234' })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.any(String), email: 'test@test.com' })
      })
  });

  it('login a user', () => {
    return request(app)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '1234' })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.any(String), email: 'test@test.com' });
        expect(res.get('X-AUTH-TOKEN')).toEqual(expect.any(String))
      });
  });

  it('fails to login a user with a bad password', () => {
    return request(app)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '1234567' })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('can verify a user', () => {
    const token = tokenize({ _id: '1234', email: 'test@test.com' });

    return request(app)
      .get('/api/users/verify')
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.body).toEqual({ _id: '1234', email: 'test@test.com' })
      })
  });
});
