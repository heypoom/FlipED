import request from "request"

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
}
