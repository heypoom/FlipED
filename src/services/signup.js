import {USER_API} from "../constants/api"

class SignupService {
  setup(app) {
    this.app = app
  }

  create(data) {
    return this.app.service(USER_API).create({
      email: data.email,
      username: data.username,
      password: data.password
    })
  }
}

export default function signup() {
  this.use("api/signup", new SignupService())
}
