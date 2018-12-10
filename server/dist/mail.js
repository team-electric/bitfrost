"use strict";

var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

var makeANiceEmail = function makeANiceEmail(text) {
  return "\n  <div className=\"email\" style=\"\n    border: 1px solid black;\n    padding: 20px;\n    font-family: sans-serif;\n    line-height: 2;\n    font-size: 20px;\n  \">\n    <h2>Hello There!</h2>\n    <p>".concat(text, "</p>\n\n    <p>\uD83D\uDE18, Wes Bos</p>\n  </div>\n");
};

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
//# sourceMappingURL=mail.js.map