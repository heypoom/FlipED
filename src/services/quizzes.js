import {Service} from "feathers-mongoose"

import {standardPerms} from "../core/hooks"

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

  this.service(QUIZ).before(standardPerms)
}
