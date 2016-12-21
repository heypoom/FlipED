import {Service} from "feathers-mongoose"
import auth from "feathers-legacy-authentication-hooks"

import assignment from "../models/assignment"

import {ASSIGNMENT} from "../constants/api"

class AssignmentService extends Service {

}

export default function assignments() {
  this.use(ASSIGNMENT, new AssignmentService({
    Model: assignment,
    paginate: {
      default: 15,
      max: 25
    }
  }))
  this.service(ASSIGNMENT).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
