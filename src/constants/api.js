export const API_NAMESPACE = "api"
export const API_URL = `/${API_NAMESPACE}/`
export const DEBUG = `${API_URL}debug`
export const USER = `${API_URL}users`
export const CLASS = `${API_URL}classes`
export const LESSON = `${API_URL}lessons`
export const MESSAGE = `${API_URL}messages`
export const COMMENT = `${API_URL}comments`
export const QUIZ = `${API_URL}quizzes`
export const ASSIGNMENT = `${API_URL}assignments`
export const VIEWER = `${API_URL}viewer`
export const POST = `${API_URL}posts`
export const GRAPHQL = `${API_URL}graphql`
export const TRACK = `${API_URL}track`
export const SOCKET = `${API_URL}socket`

export const LESSON_URL = "/lesson/"
export const QUIZ_URL = "/quiz/"
export const CLASS_URL = "/class/"

export const url = {
  lesson: LESSON_URL,
  quiz: QUIZ_URL,
  class: CLASS_URL
}

export default {
  _url: API_URL,
  debug: DEBUG,
  user: USER,
  class: CLASS,
  lesson: LESSON,
  message: MESSAGE,
  comment: COMMENT,
  quiz: QUIZ,
  assignment: ASSIGNMENT,
  viewer: VIEWER,
  post: POST,
  graphql: GRAPHQL,
  track: TRACK,
  socket: SOCKET
}
