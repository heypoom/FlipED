import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"

import lesson from "../models/lesson"
import {escapeJSON} from "../core/sanitize"

import {LESSON_API} from "../constants/api"

class LessonService extends Service {

  find(params) {
    return super.find(params)
  }

  get(id, params) {
    return super.get(id, params)
  }

  create(data, params) {
    return super.create(escapeJSON(data), params)
  }

  update(id, data, params) {
    return super.update(id, escapeJSON(data), params)
  }

  patch(id, data, params) {
    return super.patch(id, escapeJSON(data), params)
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
