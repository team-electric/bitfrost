const stringifyId = doc => {
  return ({ ...doc, _id: doc._id.toString() })
}

const prepareMongooseDoc = (result, fields = []) => {
  if (Array.isArray(result)) return result.map(item => stringifyId(item._doc));

  return fields
    .map(fieldName => ([fieldName, prepareMongooseDoc([...result[fieldName]])]))
    .reduce((doc, [fieldName, preparedDoc]) => {
      doc[fieldName] = preparedDoc;
      return doc;
    }, stringifyId(result._doc));
}

module.exports = {
  prepareMongooseDoc
}
