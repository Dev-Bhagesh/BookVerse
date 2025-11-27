const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: "neetjee720@gmail.com",
    pass: "csva dmbx qxmp rcwj",  // your Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,  // <-- THIS FIXES the certificate error
  },
});

(async () => {
  const info = await transporter.sendMail({
    from: '"BookVerse Officials" <neetjee720@gmail.com>',
    to: "basawaraj2004@gmail.com, bhageshniloor159@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent:", info.messageId);
})();
