import { Router } from 'express';
import User from './model';
import requireAuth from '../../middleware/requireAuth';
import { HttpError } from '../../middleware/error';

export default Router()
  .post('/users/signup', (req, res, next) => {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(user => res.json(user))
      .catch(next);
  })

  .post('/users/login', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if(!user.compare(password)) return next(new HttpError({ code: 401, message: 'Invalid email/password' }));
        const authToken = user.authToken();
        res.setHeader('X-AUTH-TOKEN', authToken);
        res.json(user);
      })
      .catch(next);
  })

  .get('/users/verify', requireAuth, (req, res, next) => {
    res.json(req.user);
  });
