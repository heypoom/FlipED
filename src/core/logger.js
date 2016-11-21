import winston from "winston"

const logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      timestamp: true,
      colorize: true,
      level: "debug"
    }),
    new(winston.transports.File)({
      filename: "pmcapp.log"
    })
  ]
})

export default logger
