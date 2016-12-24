import {USER, SIGNUP, USERSTATE} from "../constants/api"

class SignupService {
  setup(app) {
    this.app = app
  }

  create(data) {
    return this.app.service(USER).create({
      email: data.email,
      username: data.username,
      password: data.password
    })
  }
}

class UserStateService {
  setup(app) {
    this.app = app
  }

  create(data, params) {
    return this.app.service(USER).get(params.user._id).then(({state}) => (
      this.app.service(USER).patch(params.user._id, {state: {...state || {}, ...data}})
    ))
  }
}

export default function accounts() {
  this.use(SIGNUP, new SignupService())
  this.use(USERSTATE, new UserStateService())
}
