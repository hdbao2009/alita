const nodemailer = require("nodemailer");
const config = require('../constant');

module.exports = async () => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL || config.EMAIL,
      pass: process.env.PASSWORD || config.PASSWORD
    }
  });

  let mailOptions = {
    from: 'Bao huynh',
    to: "hdbao2909@gmail.com",
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  let info = await transporter.sendMail(mailOptions)
  
}