import express from 'express';
import morgan from 'morgan';
import router from './resources'
import cors from './middleware/cors';
import spa from './middleware/spa';
import { errorHandler } from './middleware/error';

const graphqlHTTP = require('express-graphql');
const schema = require('./resources/schema');
// const { Person } = require('./resources/people/People');

const app = express();

app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'development' }));
app.use(express.static('../client/dist'));
app.use(express.json());

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.use('/api', router);
app.use('*', spa('../client/dist/index.html'));
app.use(errorHandler);

export default app;
