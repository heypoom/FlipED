export default (state = {}, {type, payload}) => {
  switch (type) {
    case "SET_USER_INFO":
      return payload
    default:
      return state
  }
}
