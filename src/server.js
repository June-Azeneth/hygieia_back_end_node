require('dotenv').config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

var myemail = process.env.EMAIL;
var mypassword = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myemail,
        pass: mypassword
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: myemail,
        to: to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

