export default (state = {}, {type, payload}) => {
  switch (type) {
    case "SET_CLASS":
      return {
        ...state,
        data: payload
      }
    case "SET_CLASS_LIST":
      return {
        ...state,
        list: payload
      }
    case "SEARCH_CLASS":
      return {
        ...state,
        list: payload.classSearch
      }
    default:
      return state
  }
}
