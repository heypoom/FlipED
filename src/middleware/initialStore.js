import cookie from "cookie"
import decode from "../core/decodeJwt"

// import {isRoute, getIDfromURL} from "../core/helper"

import {servicesSSR, USER_API} from "../constants/api"

import {setRuntimeVariable} from "../actions/runtime"
import {setUserInfo} from "../actions/user"
import {set} from "../actions/chat"

import configureStore from "../core/configureStore"

/**
 * @module initialStore
 * @description Serves initial state to the universal renderer.
 * @param (Object) i: Parameters for SSR (Cookies, Routes, etc.)
*/

const initialStore = async i => {
  const services = servicesSSR(i.app) // Creates new instance of feathers-reduxify-services
  const store = configureStore()

  try {
    const myJwt = await decode(i.cookie)
    const user = await i.app.service(USER_API).find({
      query: {
        _id: myJwt._id,
        $select: ["_id", "username", "photo", "email", "roles", "state"]
      }
    })

    store.dispatch(setUserInfo(user.data[0]))
    store.dispatch(set(user.data[0].state))

    await store.dispatch(services.class.find())
  } catch (err) {
    // console.error(err)
    store.dispatch(setUserInfo({}))
    store.dispatch(set({}))
  }

  store.dispatch(setRuntimeVariable("route", i.route))
  store.dispatch(setRuntimeVariable("userAgent", i.userAgent))
  store.dispatch(setRuntimeVariable("cookie", (typeof i.cookie === "string" && i.cookie !== "")
    ? cookie.parse(i.cookie) : i.cookie))
  store.dispatch(setRuntimeVariable("routeQuery", i.query))

  console.log("UA_SERVER", store.getState().runtime.userAgent)
  console.log("ENV_SERVER", process.env.NODE_ENV)

  return store
}

export default initialStore
