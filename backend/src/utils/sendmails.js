const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  auth: {
    user: "nidhishagarwal14@gmail.com",
    pass: "gfrb gvov hxfn amnc",
  },
});

module.exports = transporter;
