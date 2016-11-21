import {hooks as auth} from "feathers-authentication"
import concat from "lodash.concat"
import uniqWith from "lodash.uniqwith"
import isEqual from "lodash.isequal"

import decode from "../core/decodeJwt"
import {USER_API, SOCKET_API} from "../constants/api"
import {DEFAULT_PROFILE} from "../constants/visual"
import {IS_PROD} from "../constants/util"

class System {
  constructor() {
    this.events = ["connected", "disconnected"]
  }

  setup(app) {
    this.app = app
    this.users = []
    this.app.io.on("connection", socket => {
      decode(socket.feathers.handshake.headers.cookie).then(e => {
        this.app.service(USER_API).find({
          query: {
            $select: ["_id", "username", "photo"],
            _id: e._id
          }
        })
        .then(x => {
          this.emit("connected", {
            count: this.app.io.engine.clientsCount,
            user: x.data[0]
          })
          this.users = concat(this.users, x.data[0])
          this.app.service(USER_API).on("updated", u => {
            this.emit("remoteeval", `swal("Data Changed", "Updated: ${u.username}", "success")`)
          })
          socket.on("disconnect", () => {
            this.emit("disconnected", {
              count: this.app.io.engine.clientsCount,
              user: x.data[0]
            })
            this.users.splice(this.users.indexOf(x.data[0]), 1)
          })
        })
      }).catch(error => {
        const ip = IS_PROD && ["127.0.0.1", "::1"].includes(socket.feathers.handshake.address) ?
          socket.feathers.handshake.headers["x-real-ip"] : socket.feathers.handshake.address
        const guest = {
          _id: ip,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          email: "guest@example.com",
          photo: DEFAULT_PROFILE,
          roles: "guest",
          username: `Guest ${ip}`,
          uniqueID: Math.floor(Math.random() * 100000)
        }
        this.emit("connected", {
          count: this.app.io.engine.clientsCount,
          user: guest
        })
        this.users = concat(this.users, guest)
        socket.on("disconnect", () => {
          this.emit("disconnected", {
            count: this.app.io.engine.clientsCount,
            user: guest
          })
          this.users.splice(this.users.indexOf(guest), 1)
        })
        this.app.logger.log("debug", error)
      })
    })
  }

  find() {
    return Promise.resolve({response: "Nope"})
  }

  get() {
    return Promise.resolve({
      count: this.app.io.engine.clientsCount,
      users: uniqWith(this.users, isEqual)
    })
  }

  patch(id) {
    this.app.io.sockets.emit("remoteeval", id)
    return Promise.resolve({cmd: id})
  }
}

export default function system() {
  this.use(SOCKET_API, new System())
  this.service(SOCKET_API).before({
    get: [
      auth.queryWithCurrentUser()
    ]
  })
}
