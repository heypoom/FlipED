import decode from "../core/decodeJwt"
import {servicesSSR} from "../client/api"
import {initState} from "../core/sync"
import configureStore from "../core/configureStore"

import {setRuntimeVariable} from "../actions/runtime"
import {setUserInfo} from "../actions/user"
import {set} from "../actions/chat"

import {NO_JWT, NO_COOKIE, INVALID_JWT} from "../constants"

/**
 * @module initialStore
 * @description Serves initial state to the universal renderer.
 * @param (Object) i: Parameters for SSR (Cookies, Routes, etc.)
*/

const initialStore = async i => {
  // Creates new instance of feathers-reduxify-services
  const services = servicesSSR(i.app)
  const store = configureStore()

  // TODO: Add logging
  // TODO: Limit Query
  await store.dispatch(services.classes.find({}))

  try {
    const myJwt = await decode(i.cookie)
    const userQuery = await i.app.service("users").find({
      query: {
        _id: myJwt.userId,
        $select: ["_id", "username", "photo", "email", "roles", "state"]
      }
    })

    // Dispatch and populate initial state, only if user is authenticated.
    if (userQuery) {
      if (userQuery.data.length === 1) {
        await initState(userQuery.data[0], services, store.dispatch, i.route)
      }
    }
  } catch (err) {
    if ((err === NO_JWT) || (err === NO_COOKIE)) {
      i.app.logger.log("info", `Missing JSON Web Token or Cookie`)
    } else if (err === INVALID_JWT) {
      i.app.logger.log("warn", `Invalid JSON Web Token Detected`)
    } else {
      i.app.logger.log("error", `Store Population Failure: ${err}`)
    }
    store.dispatch(setUserInfo({}))
    store.dispatch(set({}))
  }

  store.dispatch(setRuntimeVariable("route", i.route))
  store.dispatch(setRuntimeVariable("userAgent", i.userAgent))
  store.dispatch(setRuntimeVariable("routeQuery", i.query))
  store.dispatch(setRuntimeVariable("locale", i.locale))

  return store
}

export default initialStore
