import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"

import message from "../models/message"

import {MESSAGE_API} from "../constants/api"

class MessageService extends Service {

}

export default function messages() {
  this.use(MESSAGE_API, new MessageService({
    Model: message,
    paginate: {
      default: 5,
      max: 25
    }
  }))
  this.service(MESSAGE_API).before({
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    remove: []
  })
}
