import logger from "../core/logger"

/* eslint no-param-reassign: 0 */

const socketHandler = io => {
  try {
    io.on("connection", socket => {
      socket.on("sysmsg", msg => {
        logger.log("debug", "Incoming client message:", msg)
      })
      socket.on("ioinfo", cmd => {
        let res = {}
        if (cmd === "getConnectedCount") {
          res = io.engine.clientsCount // io.sockets.connected
        } else if (cmd === "getId") {
          res = socket.id
        } else if (cmd === "handshake") {
          res = socket.handshake
        }
        socket.emit("sysmsg", {data: res})
      })
    })
    io.use((socket, next) => {
      socket.feathers.handshake = socket.handshake
      socket.feathers.params = {user: "David"}
      next()
    })
  } catch (err) {
    logger.log("error", err)
  }
}

export default socketHandler
