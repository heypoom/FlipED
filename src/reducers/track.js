export default (state = {}, action) => {
  switch (action.type) {
    case "SET_ONLINE_USERS":
      return {
        ...state,
        online: action.payload
      }
    case "SET_ACTION_LIST":
      return {
        ...state,
        actions: action.payload
      }
    case "SET_USERS_LIST":
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}
