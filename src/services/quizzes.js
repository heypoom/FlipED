import {Service} from "feathers-mongoose"
import auth from "feathers-legacy-authentication-hooks"

import quiz from "../models/quiz"
import {QUIZ} from "../constants/api"

export default function quizzes() {
  this.use(QUIZ, new Service({
    Model: quiz,
    paginate: {
      default: 15,
      max: 25
    }
  }))
  this.service(QUIZ).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ]
  })
}
