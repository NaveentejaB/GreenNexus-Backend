
class MailingService {
    constructor(rabbitMQClient, emailService) {
      this.rabbitMQClient = rabbitMQClient;
      this.emailService = emailService;
    }
  
    async initialize() {
      await this.rabbitMQClient.connect();
      this.setupEmailConsumer();
    }
  
    setupEmailConsumer() {
      this.rabbitMQClient.consume('email_queue', async (data) => {
        await this.emailService.sendEmail(data.to, data.subject, data.text);
      });
    }
  
    queueEmail(to, subject, text) {
      this.rabbitMQClient.sendToQueue('email_queue', { to, subject, text });
    }
  }
  
  module.exports = MailingService;