import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"

import lesson from "../models/lesson"
import {escapeJSON} from "../core/sanitize"

import {LESSON_API} from "../constants/api"

const LESSON_STYLE = {
  imgStyle: "margin: auto; margin-top: 0.5em;"
}

class LessonService extends Service {
  find(params) {
    return super.find(params)
  }

  get(id, params) {
    return super.get(id, params)
  }

  create(data, params) {
    return super.create(escapeJSON(data, LESSON_STYLE), params)
  }

  update(id, data, params) {
    return super.update(id, escapeJSON(data, LESSON_STYLE), params)
  }

  patch(id, data, params) {
    return super.patch(id, escapeJSON(data, LESSON_STYLE), params)
  }
}

export default function lessons() {
  this.use(LESSON_API, new LessonService({
    Model: lesson,
    paginate: {
      default: 15,
      max: 25
    }
  }))
  this.service(LESSON_API).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
