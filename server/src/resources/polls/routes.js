import { Router } from 'express';
import Poll from './model';
import Vote from '../votes/model';
import requireAuth from '../../middleware/requireAuth';

export default Router()
  .post('/polls', requireAuth, (req, res, next) => {
    const { title, description, choices } = req.body;
    Poll.create({ title, description, choices })
      .then(poll => res.json(poll))
      .catch(next);
  })

  .get('/polls/:id', (req, res, next) => {
    const { id } = req.params;
    Poll.findById(id)
      .lean()
      .then(poll => res.json(poll))
      .catch(next);
  })

  .get('/polls', (req, res, next) => {
    Poll.find()
      .lean()
      .then(polls => res.json(polls))
      .catch(next);
  });
