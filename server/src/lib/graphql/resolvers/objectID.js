import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { ObjectID } from 'mongodb';

const name = 'ObjectID';

const description = 'The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.org/wiki/BSON) ID commonly used in `mongodb`.';

const serialize = _id => {
  if(_id instanceof ObjectID) return _id.toHexString();
  else if(typeof _id === 'string') return _id;
  else throw new Error(`${Object.getPrototypeOf(_id).constructor.name} not convertible to `);
};

const parseValue = _id => {
  if(typeof _id === 'string') return ObjectID.createFromHexString(_id);
  else throw new Error(`${typeof _id} not convertible to ObjectID`);
};

const parseLiteral = ast => {
  if(ast.kind === Kind.STRING) return ObjectID.createFromHexString(ast.value);
  else throw new Error(`${ast.kind} not convertible to ObjectID`);
};

const ObjectID = new GraphQLScalarType({
  name,
  description,
  serialize,
  parseValue,
  parseLiteral,
}),

export default ObjectID;
