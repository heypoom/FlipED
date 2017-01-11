import request from "request"

import {isRole} from "../core/hooks"

/* eslint class-methods-use-this: 0 */

class FetchService {

  get(id) {
    return new Promise((resolve, reject) => {
      request(id, (error, response, body) => {
        if (error)
          reject({status: response.statusCode, response, error})
        else
          resolve({status: response.statusCode, response, body})
      })
    })
  }

}

export default function debug() {
  this.use("fetch", new FetchService())

  this.service("fetch").before({
    all: [],
    find: [isRole("admin")],
    get: [isRole("admin")],
    create: [isRole("admin")],
    remove: [isRole("admin")],
    update: [isRole("admin")],
    patch: [isRole("admin")]
  })
}
