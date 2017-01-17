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

  find(params) {
    return this.app.service(USER).get(params.user._id)
  }

  create(data) {
    return this.app.service(USER).create({
      email: data.email,
      username: data.username,
      password: data.password,
      roles: "teacher"
    })
  }

  patch(mode, data, params) {
    return this.app.service(USER).patch(params.user._id, data)
  }
}

const isNonEmptyObject = obj => {
  if (obj.constructor === Object) {
    return Object.keys(obj).length > 0
  }
  return false
}

class InvitationService {
  setup(app) {
    this.app = app
  }

  get(code, params) {
    if (params.user) {
      return this.app.service("classes").get(code)
        .then(course => (this.app.service("classes").patch(course._id, {
          students: [...course.students, params.user._id]
        })))
        .then(course => (Promise.resolve({
          status: "JOIN_EXISTING_SUCCESS",
          message: `คุณ ${params.user.username} เข้าร่วมคอร์ส ${course.name} เรียบร้อยแล้วครับ`
        })))
    }
    return Promise.reject("Unauthenticated.")
  }

  create(data) {
    return this.app.service("classes").get(data.code)
      .then(async course => {
        const user = await this.app.service(USER).create({
          email: data.email,
          username: data.username,
          password: data.password,
          roles: "student",
          state: {CURRENT_COURSE: data.code}
        })
        return Promise.resolve({user, course})
      })
      .then(({user, course}) => {
        this.app.service("classes").patch(course._id, {
          students: [...course.students, user._id]
        })
        return Promise.resolve({
          status: "INVITE_SUCCESS",
          message: `ยินดีต้อนรับ! คุณถูกเชิญให้เข้าร่วมคอร์ส ${course.name} ในชื่อ ${user.username}.`,
          user
        })
      })
      .catch(e => {
        if (e.name === "NotFound") {
          return Promise.reject({
            error: "INVALID_INVITATION_CODE",
            message: "Invalid Invitation Code."
          })
        }
        if (e.name === "BadRequest" && isNonEmptyObject(e.errors)) {
          return Promise.reject({
            error: "INVITATION_FORM_INCOMPLETE",
            message: "Please fill in the required field before proceeding."
          })
        }
        return Promise.reject({
          error: "UNKNOWN_INVITATION_ERROR",
          message: "Unknown error occured in the invitation process."
        })
      })
  }

}

export default function accounts() {
  this.use("userstate", new UserStateService())
  this.use("accounts", new AccountService())
  this.use("invitation", new InvitationService())

  this.service("userstate").after({
    all: [hooks.remove("password", "salt")]
  })
  this.service("accounts").after({
    all: [hooks.remove("password", "salt")]
  })
}
