import {app} from "../constants/api"
import findIndex from "lodash.findindex"

export default (state = {}, action) => {
  switch (action.type) {
    case "SET_QUIZ_LIST":
      return {
        ...state,
        list: action.payload
      }
    case "QUIZ_SUBMIT_ANSWER":
      const q = action.payload.questionList
      const quizIndex = findIndex(q, {
        _id: action.payload.question
      })
      const answerIndex = findIndex(q[quizIndex].choices, {
        text: action.payload.answer
      })
      return {
        ...state,
        result: q[quizIndex].choices[answerIndex].correct
      }
    default:
      return state
  }
}
