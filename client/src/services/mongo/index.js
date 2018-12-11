import { graphqlReq } from '../requests';

const MONGO_API_URL = '/graphql?';

export const request = graphqlReq(MONGO_API_URL);
