// express
import express from 'express';
const app = express();

// logging
import morgan from 'morgan';
app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'development' }));

// basic express stuff
app.use(express.static('../client/dist'));
app.use(express.json());

// graph QL stuff
import graphqlHTTP from 'express-graphql';
import schema from './resources';
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// serve the front end
import spa from './middleware/spa';
app.use('*', spa('../client/dist/index.html'));

// catch errors
import { errorHandler } from './middleware/error';
app.use(errorHandler);


// start the server

import { config } from 'dotenv';
import { connect } from './lib/db';
config();
connect();

const PORT = process.env.PORT || 7890;
app.listen(PORT, () => console.log('Running on', PORT));
