const nodemailer = require("nodemailer");

async function sendResetEmail(to,subject,html){
  
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:"neetjee720@gmail.com",
        pass:"csva dmbx qxmp rcwj",
      },
      tls:{
        rejectUnauthorized:false,
      },
    })
    await transporter.sendMail({
      from:'"BookVerse Officials" <neetjee720@gmail.com>',
      to,
      subject,
      html
    });
}

module.exports = sendResetEmail;