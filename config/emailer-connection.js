const nodemailer = require('nodemailer');
const username = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: username,
        pass: password
    }
});

module.exports = transporter;
