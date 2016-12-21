import {Service} from "feathers-mongoose"
import auth from "feathers-legacy-authentication-hooks"

import track from "../models/track"

import {TRACK} from "../constants/api"

export default function tracks() {
  this.use(TRACK, new Service({
    Model: track,
    paginate: {
      default: 5,
      max: 25
    }
  }))
  this.service(TRACK).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
