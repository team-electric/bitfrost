import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes';

export default function PollCard({ _id, title }) {
  return (
    <>
      <p><Link to={ROUTES.POLL.linkTo(_id)}>{title}</Link></p>
    </>
  );
}
