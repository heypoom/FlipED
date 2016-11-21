import authentication from "feathers-authentication"

import {AUTH_CONFIG_SERVER} from "../config"

export default function auth() {
  this.configure(authentication(AUTH_CONFIG_SERVER))
}
