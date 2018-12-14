const stringifyId = doc => {
  return { ...doc, _id: doc._id.toString() };
};

export const prepareMongooseDoc = (result, fields = []) => {
  if (Array.isArray(result)) return result.map(item => stringifyId(item._doc));

  return fields
    .map(fieldName => [fieldName, prepareMongooseDoc([...result[fieldName]])])
    .reduce((doc, [fieldName, preparedDoc]) => {
      doc[fieldName] = preparedDoc;
      return doc;
    }, stringifyId(result._doc));
};

const prepareObj = obj => {
  if (!obj) return null;
  if (typeof obj.graphql === 'function') return obj.graphql();
  return prepareMongooseDoc(obj);
};

export const prepare = obj => {
  if (Array.isArray(obj)) return obj.map(prepareObj);
  return prepareObj(obj);
};
