import findIndex from "lodash.findindex"
import {createReducer} from "../core/helper"

export default createReducer({}, state => ({
  SET_QUIZ_LIST: payload => ({...state, list: payload}),
  QUIZ_SUBMIT_ANSWER: ({question, answer}) => {
    const q = payload.questionList
    const quizIndex = findIndex(q, {_id: question})
    const answerIndex = findIndex(q[quizIndex].choices, {text: answer})
    return {
      ...state,
      result: q[quizIndex].choices[answerIndex].correct
    }
  }
}))
