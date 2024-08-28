const nodemailer = require('nodemailer');
const winston = require('winston');

class EmailSender {
  constructor(config) {
    this.transporter = nodemailer.createTransport(config);
  }

  async sendEmail(email, title, body) {
    try {
      await this.transporter.sendMail({
        from: 'naveentejasd@gmail.com',
        to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
    });
      winston.info('Email sent successfully');
    } catch (error) {
      winston.error('Error sending email:', error);
      throw error;
    }
  }

}

module.exports = EmailSender;