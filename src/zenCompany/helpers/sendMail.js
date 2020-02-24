"use strict";
const sendgrid = require("sendgrid")(process.env.SENDGRID_KEY);
module.exports = {
  async sendMail(to, from, subject, body, sendbox_mode = false) {}
};
