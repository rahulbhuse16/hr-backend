const nodeMailer = require('nodemailer');

const smtpAuthUser = process.env.SMTP_AUTH_USER;
const smtpAuthPass = process.env.SMTP_AUTH_PASS;

transpoter = nodeMailer.createTransport({
    service : gmail,
    auth:{
        user:smtpAuthUser,
        pass:smtpAuthPass
    }
})

module.exports = transpoter;