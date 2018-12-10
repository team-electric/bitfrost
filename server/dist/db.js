"use strict";

// This file connects to the remote prisma DB and gives us the ability to query it with JS
var _require = require('prisma-binding'),
    Prisma = _require.Prisma;

var db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});
module.exports = db;
//# sourceMappingURL=db.js.map