import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"

import classModel from "../models/class"

import {CLASS_API} from "../constants/api"

class ClassService extends Service {

}

export default function courses() {
  this.use(CLASS_API, new ClassService({
    Model: classModel,
    paginate: {
      default: 15,
      max: 25
    }
  }))
  this.service(CLASS_API).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
