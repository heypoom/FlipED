import {Service} from "feathers-mongoose"

import {viewRole, modifyRole} from "../core/hooks"

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
    all: [],
    find: [viewRole],
    get: [viewRole],
    create: [modifyRole],
    update: [modifyRole],
    patch: [modifyRole]
  })
}
