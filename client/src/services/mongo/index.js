import { graphqlReq } from '../requests';

export const request = graphqlReq(process.env.MONGO_API_URL);
