class DebugService {
  setup(app) {
    this.app = app
  }

  find = () => Promise.resolve({data: "Debug Endpoint"})

  get = async () => {
    const users = await this.app.service("users").find()
    const courses = await this.app.service("lessons").find()
    return Promise.resolve({
      users: users.total,
      courses: courses.total
    })
  }
}

export default function debug() {
  this.use("debug", new DebugService())
}
