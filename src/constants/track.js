export const TRACK_TYPE_DESC = {
  POP_QUIZ_FINISHED: "completed a pop quiz.",
  POP_QUIZ_RETRY: "retried a pop quiz.",
  LESSON_OPEN: "opened a lesson."
}

export const TRACK_PAYLOAD_DESC = {
  POP_QUIZ_FINISHED: [
    {
      label: "Quiz ID",
      index: "quizId"
    },
    {
      label: "Score",
      index: "score"
    }
  ],
  POP_QUIZ_RETRY: [{
    label: "Quiz ID",
    index: "quizId"
  }],
  LESSON_OPEN: [{
    label: "Lesson ID",
    index: "lessonId"
  }]
}
