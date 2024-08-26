const express = require("express");
const {connectDB,disconnectDB,sequelize} = require("../src/config/DB")
const winston = require('winston');
const userRoutes = require("../src/routes/user-routes")
const port = 3000
const isPortAvailable = require('is-port-available');

class App {
  constructor() {
    console.log("i am here");
    this.app = express();
    console.log("i am here");
    this.initialize();
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
