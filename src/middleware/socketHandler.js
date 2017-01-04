import logger from "../core/logger"

/* eslint no-param-reassign: 0 */

const socketHandler = io => {
  try {
    io.on("connection", socket => {
      socket.on("ioinfo", cmd => {
        let res = {}
        if (cmd === "getConnectedCount") {
          res = io.engine.clientsCount
        } else if (cmd === "getId") {
          res = socket.id
        } else if (cmd === "handshake") {
          res = socket.handshake
        } else if (cmd === "ping") {
          res = "pong"
        }
        socket.emit("sysmsg", {data: res})
      })
    })
    io.use((socket, next) => {
      // Everything in socket.feathers will be available in hook.params
      socket.feathers.handshake = socket.handshake
      next()
    })
  } catch (err) {
    logger.log("error", err)
  }
}

export default socketHandler
