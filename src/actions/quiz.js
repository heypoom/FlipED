export const setQuizList = (data) => ({
  type: "SET_QUIZ_LIST",
  payload: data
})

export const submitAnswer = (question, answer, questionList) => ({
  type: "QUIZ_SUBMIT_ANSWER",
  payload: {question, answer, questionList}
})
