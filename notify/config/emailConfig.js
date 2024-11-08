const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "7circleofhell@gmail.com",
    pass: "kvev cfpg ppbh vlws",
  },
});

module.exports = transporter;
