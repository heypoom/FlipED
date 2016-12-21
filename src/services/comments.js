import {Service} from "feathers-mongoose"
import auth from "feathers-legacy-authentication-hooks"

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
  this.service(COMMENT).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: [
      auth.restrictToOwner({ownerField: "owner"})
    ]
  })
}
