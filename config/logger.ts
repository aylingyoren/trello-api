import winston, { Logger } from "winston";

const logger: Logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.json(),
    }),
  ],
});

export default logger;
