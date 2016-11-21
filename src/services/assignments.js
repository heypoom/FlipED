import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"

import assignment from "../models/assignment"

import {ASSIGNMENT_API} from "../constants/api"

class AssignmentService extends Service {

}

export default function assignments() {
  this.use(ASSIGNMENT_API, new AssignmentService({
    Model: assignment,
    paginate: {
      default: 15,
      max: 25
    }
  }))
  this.service(ASSIGNMENT_API).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
