import hooks from "feathers-hooks-common"

import {USER} from "../constants/api"

class UserStateService {
  setup(app) {
    this.app = app
  }

  create(data, params) {
    return this.app.service(USER).get(params.user._id, {
      query: {$select: ["state"]}
    }).then(({state}) => (
      this.app.service(USER).patch(params.user._id, {
        state: {...state || {}, ...data}
      })
    ))
  }
}

class AccountService {
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

  find(params) {
    return this.app.service(USER).get(params.user._id)
  }
}

export default function accounts() {
  this.use("userstate", new UserStateService())
  this.use("accounts", new AccountService())
  this.service("accounts").after({
    all: [hooks.remove("password", "salt")]
  })
}
