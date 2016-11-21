export default (state = {}, {type, payload}) => {
  switch (type) {
    case "SET_USER_INFO":
      return payload
    case "LOGIN":
      return payload.auth.data
    case "LOGOUT":
      return payload.auth
    default:
      return state
  }
}
