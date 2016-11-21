import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"

import comment from "../models/comment"

import {COMMENT_API} from "../constants/api"

class CommentService extends Service {

}

export default function comments() {
  this.use(COMMENT_API, new CommentService({
    Model: comment,
    paginate: {
      default: 15,
      max: 25
    }
  }))
  this.service(COMMENT_API).before({
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
