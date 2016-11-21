import jwt from "jsonwebtoken"


import logger from "../../../core/logger"

export default function verifyPassword(app, username, password) {
  return app.service("users").find({
    query: {
      username
    }
  }).then(users => {
    if (users && users[0]) {
      const user = users[0]
      const crypto = bcrypt
      const hash = user.password
      if (!hash)
        return new Error(`User record in the database is missing a password`)

      return crypto.compare(password, hash).then((result, error) => {
        if (result) {
          const secret = app.get("auth").token.secret
          const token = jwt.sign({_id: user._id}, secret, {})
          return {
            token,
            data: user
          }
        }
        if (error)
          logger.log("error", error)
        return new Error(`Authentication failed`)
      })
    }
    return new Error(`Cannot find user`)
  })
}
