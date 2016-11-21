import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"

import quiz from "../models/quiz"
import {QUIZ_API} from "../constants/api"

class QuizService extends Service {

}

export default function quizzes() {
  this.use(QUIZ_API, new QuizService({
    Model: quiz,
    paginate: {
      default: 15,
      max: 25
    }
  }))
  this.service(QUIZ_API).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    find: [
      // d
    ],
    get: [

    ],
    remove: []
  })
}
