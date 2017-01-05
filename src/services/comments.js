import {Service} from "feathers-mongoose"

import {standardPerms} from "../core/hooks"

import comment from "../models/comment"
import {COMMENT} from "../constants/api"

export default function comments() {
  this.use(COMMENT, new Service({
    Model: comment,
    paginate: {
      default: 15,
      max: 25
    }
  }))

  this.service(COMMENT).before(standardPerms)
}
