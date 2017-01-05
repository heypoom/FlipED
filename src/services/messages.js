import {Service} from "feathers-mongoose"

import {standardPerms} from "../core/hooks"

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

  this.service(MESSAGE).before(standardPerms)
}
