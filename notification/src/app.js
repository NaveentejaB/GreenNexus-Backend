const express = require("express");
const {connectDB,disconnectDB,sequelize} = require("../src/config/DB")
const winston = require('winston');
const userRoutes = require("../src/routes/user-routes")
const port = 3000
const isPortAvailable = require('is-port-available')
const RabbitMQClient = require('./utils/rabbitMQ')
const MailingService = require('./services/mailing-service')
const EmailSender = require('./utils/mail-util')

class App {
  constructor() {
    this.app = express();
    this.initialize();
    this.rabbitMQClient = new RabbitMQClient();
    this.emailService = new EmailSender({
      service : process.env.MAIL_HOST,
      // host:process.env.MAIL_HOST,  //-> Host SMTP detail
          auth:{
              user: process.env.MAIL_USER,  //-> User's mail for authentication
              pass: process.env.MAIL_PASS,  //-> User's password for authentication
          }
    });

    this.notificationService = new MailingService(this.rabbitMQClient, this.emailService);
  }

  async initialize(){
    try{
      await connectDB();
      await sequelize.sync();
      this.setMiddlewares();
      this.setRoutes();
      this.start();
      this.app.get("/", (req, res) => {
        res.send("Hello, World!");
      });
      
    }catch(error){
      winston.error('Failed to initialize app:', error);
      process.exit(1);
    }
  }
  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  setRoutes() {
    this.app.use('/',userRoutes);
  }

  async start() {
    let availablePort = port;
    while (!await isPortAvailable(availablePort)) {
      availablePort++;
    }

    this.server = this.app.listen(availablePort, (e) => {
      if (e) {
        console.error("Error starting server:", e);
        winston.error("Error starting server:", e);
        process.exit(1);
      } else {
        winston.info(`Server started on port ${availablePort}`);
      }
    });

    process.on('SIGINT', () => this.stop());
    process.on('SIGTERM', () => this.stop());
  }

  async stop() {
    try {
      await disconnectDB();
      this.server.close(() => {
        winston.info('Server stopped');
        process.exit(0);
      });
    } catch (error) {
      winston.error('Error during server shutdown:', error);
      process.exit(1);
    }
  }
}

module.exports = App;
