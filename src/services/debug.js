import {DEBUG} from "../constants/api"

class DebugService {
  setup(app) {
    this.app = app
  }

  find = () => Promise.resolve({data: "Debug Endpoint"})
}

export default function debug() {
  this.use(DEBUG, new DebugService())
}
