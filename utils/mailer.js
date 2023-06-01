const nodeMailer = require("nodemailer");
require("dotenv").config();

// format for the welcome email
const welcomeEmail = `
<html>
<head>
  <style>
    /* CSS styles for the email */
  </style>
</head>
<body>
  <h1>Welcome to Pawsitive Connections!</h1>
  <img this is a placeholder for logo src= http://via.placeholder.com/640x360 >
  <p>Dear "add the $ here for the username {data.username}" ,</p>
  <p>Thank you for signing up for Pawsitive Connections! We are thrilled to have you as a member of our community.</p>
  <p>At Pawsitive Connections, we are dedicated to promoting the well-being and happiness of pets and their owners. We provide a platform for pet lovers to connect, share experiences, and support each other.</p>
  <p>Feel free to explore our website and start connecting with fellow pet enthusiasts. If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
  <p>Once again, welcome to Pawsitive Connections!</p>
  <p>Best regards,</p>
  <p>The Pawsitive Connections Team</p>
</body>
</html>`;

// config for smtp server
async function sendEmail(data) {
  const transporter = nodeMailer.createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    secure: true,
    auth: {
      user: process.env.emailAddress,
      pass: process.env.emailPassword,
    },
  });

  // email setup info
  const emailInfo = await transporter.sendMail({
    from: process.env.emailAddress,
    to: data,
    subject: "Welcome to Pawsitive Connections!",
    html: welcomeEmail,
  });
}
module.exports = sendEmail;
