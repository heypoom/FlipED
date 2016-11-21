import {before, after} from "./hooks"
import {VIEWER_API} from "../../constants/api"

export class ViewerService {
  constructor(options = {}) {
    this.options = options
  }

  find(params) {
    return Promise.resolve({user: params.user, token: params.token, provider: params.provider})
  }
}

export default function viewer() {
  const app = this

  app.use(VIEWER_API, new ViewerService())
  app.service(VIEWER_API).before(before).after(after)
}
