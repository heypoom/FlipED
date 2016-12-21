import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import {routerReducer} from "connected-react-router"

import app from "./app"
import runtime from "./runtime"
import user from "./user"
import chat from "./chat"
import track from "./track"

import {services} from "../client/api"

export default combineReducers({
  runtime,
  user,
  track,
  chat,
  app,
  form: formReducer,
  router: routerReducer,
  users: services.user.reducer,
  class: services.class.reducer,
  lesson: services.lesson.reducer,
  comment: services.comment.reducer,
  quiz: services.quiz.reducer,
  assignment: services.assignment.reducer,
  tracks: services.track.reducer,
  socket: services.socket.reducer,
})
