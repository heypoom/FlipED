import {Service} from "feathers-mongoose"

import {standardPerms} from "../core/hooks"

import assignment from "../models/assignment"
import {ASSIGNMENT} from "../constants/api"

export default function assignments() {
  this.use(ASSIGNMENT, new Service({
    Model: assignment,
    paginate: {
      default: 15,
      max: 25
    }
  }))

  this.service(ASSIGNMENT).before(standardPerms)
}
