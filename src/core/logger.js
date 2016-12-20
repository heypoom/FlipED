import {Logger, transports} from "winston"

const logger = new Logger({
  transports: [
    new transports.Console({
      timestamp: true,
      colorize: true,
      level: "debug"
    }),
    new transports.File({
      filename: "pmcapp.log"
    })
  ]
})

export default logger
