import { config } from 'dotenv';
import { hashSync, compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

config();
const APP_SECRET = process.env.APP_SECRET;
const EXPIRE_AT = '24h';

export const hash = clear => hashSync(clear, 8);

export const compare = (clear, hash) => compareSync(clear, hash);

export const tokenize = payload => sign({ payload }, APP_SECRET, { expiresIn: EXPIRE_AT });

export const untokenize = token => verify(token, APP_SECRET).payload;
