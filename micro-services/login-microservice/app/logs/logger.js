const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  exitOnError: false,
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: `./logs/login.log` }),
    new winston.transports.Console(),
  ],
});
module.exports = logger;
