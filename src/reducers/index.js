import {combineReducers} from "redux"
import {reducer as awaitReducer} from "redux-await"

import runtime from "./runtime"
import user from "./user"
import quiz from "./quiz"
import classes from "./classes"
import lesson from "./lesson"
import track from "./track"

export default combineReducers({
  runtime,
  user,
  quiz,
  classes,
  lesson,
  track,
  await: awaitReducer
})
