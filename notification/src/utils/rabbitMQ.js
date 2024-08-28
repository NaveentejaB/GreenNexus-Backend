const amqp = require('amqplib');
const winston = require('winston');

class RabbitMQClient {
  constructor() {
    this.channel = null;
  }

  async connect() {
    try {
      const connection = await amqp.connect('amqp://localhost');
      this.channel = await connection.createChannel();
      await this.channel.assertQueue('email_queue', { durable: true });
      winston.info('Connected to RabbitMQ');
    } catch (error) {
      winston.error('RabbitMQ connection error:', error);
      throw error;
    }
  }

  sendToQueue(queueName, data) {
    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  }

  async consume(queueName, callback) {
    await this.channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        await callback(data);
        this.channel.ack(msg);
      }
    });
  }
}

module.exports = RabbitMQClient;