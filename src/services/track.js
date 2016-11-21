import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"

import track from "../models/track"

import {TRACK_API} from "../constants/api"

export default function tracks() {
  this.use(TRACK_API, new Service({
    Model: track,
    paginate: {
      default: 5,
      max: 25
    }
  }))
  this.service(TRACK_API).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
