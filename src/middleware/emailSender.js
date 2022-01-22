const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mrbharatsingh4@gmail.com",
    pass: "vdezpsbuoxeixdkc",
  },
});

module.exports = transporter;
