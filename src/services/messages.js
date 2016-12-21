import {Service} from "feathers-mongoose"
import auth from "feathers-legacy-authentication-hooks"

import message from "../models/message"

import {MESSAGE} from "../constants/api"

export default function messages() {
  this.use(MESSAGE, new Service({
    Model: message,
    paginate: {
      default: 5,
      max: 25
    }
  }))
  this.service(MESSAGE).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
