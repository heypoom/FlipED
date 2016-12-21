import {Service} from "feathers-mongoose"
import auth from "feathers-legacy-authentication-hooks"

import classModel from "../models/class"

import {CLASS} from "../constants/api"

export default function courses() {
  this.use(CLASS, new Service({
    Model: classModel,
    paginate: {
      default: 15,
      max: 25
    }
  }))
  this.service(CLASS).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
