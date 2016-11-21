import cookie from "cookie"

import configureStore from "../store/configureStore"

import {setRuntimeVariable} from "../actions/runtime"
import {setClassList, setClass} from "../actions/classes"
import {setLessonList, setLesson} from "../actions/lesson"
import {setQuizList} from "../actions/quiz"
import {setUserInfo} from "../actions/user"
import {setOnlineUsers, setActionList, setUsersList} from "../actions/track"

const initialStore = (i) => {
  const store = configureStore({})

  store.dispatch(setUserInfo(i.user.hasOwnProperty("data") ? i.user.data[0] : {}))
  store.dispatch(setOnlineUsers(i.online))
  store.dispatch(setActionList(i.actionList))
  store.dispatch(setQuizList(i.quizList))
  store.dispatch(setClassList(i.classList))
  store.dispatch(setClass(i.class || {}))
  store.dispatch(setLessonList(i.lessonList))
  store.dispatch(setUsersList(i.usersList))
  store.dispatch(setLesson(
    i.lesson.hasOwnProperty("data") && (i.lesson.total > 0)
      ? i.lesson.data[0] : {content: [{type: "none"}]}
  ))

  store.dispatch(setRuntimeVariable({
    name: "route",
    value: i.route
  }))

  store.dispatch(setRuntimeVariable({
    name: "userAgent",
    value: i.userAgent
  }))

  store.dispatch(setRuntimeVariable({
    name: "cookie",
    value: ((typeof i.cookie === "string") && (i.cookie !== ""))
      ? cookie.parse(i.cookie) : i.cookie
  }))

  store.dispatch(setRuntimeVariable({
    name: "routeQuery",
    value: i.query
  }))

  return store
}

export default initialStore
