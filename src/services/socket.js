import uniqWith from "lodash.uniqwith"
import findIndex from "lodash.findindex"

import decode from "../core/decodeJwt"

import {NO_JWT, NO_COOKIE, INVALID_JWT} from "../constants"
import {USER, SOCKET} from "../constants/api"
import {IS_PROD} from "../constants/util"

const local = ["127.0.0.1", "::1"]

class Socket {

  constructor() {
    this.events = ["connected", "disconnected"]
    this.users = []
    this.sessions = []
  }

  handleConnection(inst) {
    const index = findIndex(this.users, i => String(i._id) === String(inst._id))
    this.sessions = this.sessions.concat(inst._id)
    if (index < 0) {
      // First Session
      this.users = this.users.concat(inst)
      this.emit("connected", {
        sessions: this.app.io.engine.clientsCount,
        count: this.users.length,
        user: inst
      })
      this.app.logger.log("debug", `User ${inst._id} has joined.`)
    } else {
      // More connections are made using the same account
    }
  }

  handleDisconnection(inst) {
    let index = findIndex(this.sessions, i => String(i) === String(inst._id))
    this.sessions.splice(index, 1)
    index = findIndex(this.sessions, i => String(i) === String(inst._id))
    if (index < 0) {
      // No more sessions left
      this.users = this.users.filter(i => String(i._id) !== String(inst._id))
      this.sessions = this.sessions.filter(i => String(i) !== String(inst._id))
      this.emit("disconnected", {
        sessions: this.app.io.engine.clientsCount,
        count: this.users.length,
        user: inst
      })
      this.app.logger.log("debug", `User ${inst._id} has left.`)
    } else {
      // Other connections are still online
    }
  }

  setup(app) {
    this.app = app
    this.app.io.on("connection", socket => {
      // Retrieves IP addresses behind reverse proxies
      const hs = socket.feathers.handshake
      const ip = IS_PROD && local.includes(hs.address) ?
        hs.address.headers["x-real-ip"] : hs.address

      // Decode Cookies to verify and retrieve JWT
      decode(hs.headers.cookie)
      .then(jwt => (this.app.service(USER).get(jwt.userId)))
      .then(user => {
        const inst = {
          _id: user._id,
          username: user.username,
          photo: user.photo,
          roles: user.roles
        }

        this.handleConnection(inst)
        this.app.logger.log("debug",
          `User Connected: ${inst.username} (${inst._id} @ ${ip})`)

        socket.on("disconnect", () => {
          this.handleDisconnection(inst)
          this.app.logger.log("debug",
            `User Disconnected: ${inst.username} (${inst._id} @ ${ip})`)
        })
      })
      .catch(err => {
        if ((err === NO_JWT) || (err === NO_COOKIE) || (err === INVALID_JWT)) {
          const inst = {_id: ip}

          this.handleConnection(inst)
          this.app.logger.log("debug", `Guest Connected: ${inst._id}`)

          socket.on("disconnect", () => {
            this.handleDisconnection(inst)
            this.app.logger.log("debug", `Guest Disconnected: ${inst._id}`)
          })
        } else {
          this.app.logger.log("error", `Unhandled Socket Error: ${err}`)
        }
      })
    })
  }

  find() {
    // Only sends unique users in session lists.
    const users = uniqWith(this.users, (x, y) => String(x._id) === String(y._id))
    this.app.logger.log("debug", `Sessions: ${this.users.length}.`,
      `Online Users: ${users.length}`)
    return Promise.resolve({
      sessions: this.app.io.engine.clientsCount,
      count: users.length,
      users: users
    })
  }

  patch(id) {
    // HACK: Really Dangerous! Emit a Remote eval() event to all connected sockets.
    this.app.io.sockets.emit("remoteeval", id)
    return Promise.resolve({cmd: id})
  }

}

export default function sckt() {
  this.use(SOCKET, new Socket())
}
