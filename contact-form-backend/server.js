const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 3000;
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rituanuragi1@gmail.com",
    pass: "geon ylan rgeq mfld",
  },
});

app.post("/send", (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const mailOptions = {
    from: email,
    to: "rituf2fintech@gmail.com",
    subject: `Contact Form: ${subject}`,
    text: `You have a new contact_submission from:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
