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
  users: services.users.reducer,
  classes: services.classes.reducer,
  lessons: services.lessons.reducer,
  comments: services.comments.reducer,
  quizzes: services.quizzes.reducer,
  assignments: services.assignments.reducer,
  tracks: services.track.reducer,
  socket: services.socket.reducer,
})
