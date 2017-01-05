import {Service} from "feathers-mongoose"

import {viewRole, modifyRole} from "../core/hooks"

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
    all: [],
    find: [viewRole],
    get: [viewRole],
    create: [modifyRole],
    update: [modifyRole],
    patch: [modifyRole]
  })
}
