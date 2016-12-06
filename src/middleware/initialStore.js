import cookie from "cookie"
import decode from "../core/decodeJwt"

// import {isRoute, getIDfromURL} from "../core/helper"

import {servicesSSR, USER_API} from "../constants/api"

import {setRuntimeVariable} from "../actions/runtime"
import {setUserInfo} from "../actions/user"

import configureStore from "../store/configureStore"

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
        $select: ["_id", "username", "photo", "email", "roles"]
      }
    })

    store.dispatch(setUserInfo(user.data[0]))

    await store.dispatch(services.class.find())
  } catch (err) {
    // console.error(err)
    store.dispatch(setUserInfo({}))
  }

  store.dispatch(setRuntimeVariable({
    name: "route",
    value: i.route
  }))

  store.dispatch(setRuntimeVariable({
    name: "userAgent",
    value: i.userAgent
  }))

  store.dispatch(setRuntimeVariable({
    name: "cookie",
    value: ((typeof i.cookie === "string") && (i.cookie !== ""))
      ? cookie.parse(i.cookie) : i.cookie
  }))

  store.dispatch(setRuntimeVariable({
    name: "routeQuery",
    value: i.query
  }))

  // console.log(store.getState().class)

  return store
}

export default initialStore
