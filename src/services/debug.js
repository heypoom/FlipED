import {DEBUG_API} from "../constants/api"

class DebugService {
  setup(app) {
    this.app = app
  }

  find() {
    return Promise.resolve({data: "Debug Endpoint"})
  }
}

export default function debug() {
  this.use(DEBUG_API, new DebugService())
}
