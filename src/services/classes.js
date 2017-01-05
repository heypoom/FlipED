import {Service} from "feathers-mongoose"

import {standardPerms} from "../core/hooks"

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

  this.service(CLASS).before(standardPerms)
}
