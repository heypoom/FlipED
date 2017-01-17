import {Service} from "feathers-mongoose"

import {standardPerms} from "../core/hooks"

import classModel from "../models/class"
import {CLASS} from "../constants/api"

class StudentService {
  setup(app) {
    this.app = app
  }

  find(params) {
    if (params.user) {
      return this.app.service(CLASS).find({
        query: {
          $select: ["owner", "students"],
          owner: {
            $in: [params.user._id]
          }
        }
      })
    }
    return Promise.reject("No user field found")
  }
}

export default function courses() {
  this.use(CLASS, new Service({
    Model: classModel,
    paginate: {
      default: 15,
      max: 25
    }
  }))

  this.use("students", new StudentService())

  this.service(CLASS).before(standardPerms)
}
