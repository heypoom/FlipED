class QuizRoom {
  setup(app) {
    this.app = app
  }

  find(params) {
    return Promise.resolve({response: "Nope"})
  }

  get(id, params) {
    return Promise.resolve({
      msg: `Session ${id} ACTIVE.`
    })
  }

  create(data, params) {
    return this.app.service("/api/quizzes").find({
      query: {_id: data.id}
    }).then(e => {
      const res = e.data[0]
      return {
        msg: "Session Created.",
        activeSession: Math.floor(Math.random() * 200000),
        quiz: res
      }
    })
    .catch(e => (e))
  }

}

export default function quizRoom() {
  this.use("/api/quizroom", new QuizRoom())
}
