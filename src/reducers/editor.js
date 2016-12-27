import {createReducer} from "../core/helper"

/**
  @example {
    9wai09fjwaifjawij: [{
      type: 0,
      node: 1
    }]
  }
  @example State Tree Viewer
  <div>
    {editor && (
      <Grid style={{position: "absolute", left: 0, top: 0, width: "280px"}} c>
        <pre style={{whiteSpace: "pre-wrap", lineHeight: "1.5em", fontSize: "0.7em"}}>
          <code dangerouslySetInnerHTML={{__html: JSON.stringify(editor, null, 4)}} />
        </pre>
      </Grid>
    )}
  </div>
*/

export default createReducer({}, state => ({
  SET_EDITOR: ({content, index, key, value}) => {
    if (content) {
      if (Array.isArray(state[content])) {
        if (state[content][index]) {
          const temp = state[content]
          temp[index] = {...temp[index], [key]: value}
          return {...state, [content]: temp}
        }
        const temp = state[content]
        temp[index] = {[key]: value}
        return {...state, [content]: temp}
      }
      return {...state, [content]: [{[key]: value}]}
    }
    return state
  },
  LOAD_EDITOR: ({content, data}) => {
    if (content && Array.isArray(data) && typeof data[0] === "object")
      return {...state, [content]: data}
    return state
  }
}))
