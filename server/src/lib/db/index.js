import mongoose from 'mongoose';
import { parse } from 'url';
import { config } from 'dotenv';

config();

const log = (event, dbUrl) => () => console.log(`${event.toUpperCase()}: connection to ${dbUrl}`);

const redactURLAuth = url => {
    const parsedUrl = parse(url);
    const redactedAuth = parsedUrl.auth ? '***:***@' : '';
    return `${parsedUrl.protocol}//${redactedAuth}${parsedUrl.hostname}:${parsedUrl.port}${parsedUrl.path}`;
};

export const connect = (dbUrl = process.env.MONGODB_URI) => {
    mongoose.connect(dbUrl, { useNewUrlParser: true });

    const redactedUrl = redactURLAuth(dbUrl);

    mongoose.connection.on('error', log('error', redactedUrl));
    mongoose.connection.on('open', log('open', redactedUrl));
    mongoose.connection.on('close', log('close', redactedUrl));

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};

export const disconnect = () => mongoose.connection.close();

export const dropCollection = name => {
    const { MONGODB_URI } = process.env;
    connect(MONGODB_URI);
    return mongoose.connection.dropCollection(name)
        .catch(err => {
            if(err.codeName !== 'NamespaceNotFound') throw err;
        });
};
