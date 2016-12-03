import {connect} from "react-redux"

import {ROLE} from "../constants"

const Role = props => {
  const current = ROLE[props.currentRole || "none"].perm
  if (props.only) {
    if (props.currentRole === props.only) {
      return props.children
    }
  } else if (props.is) {
    const is = ROLE[props.is || "guest"].perm
    if (is === 0) {
      return props.children
    } else if ((is === -1) && (current === -1)) {
      return props.children
    } else if ((current >= is) && (is !== -1)) {
      return props.children
    }
  } else if (props.less) {
    if ((current <= ROLE[props.less || "guest"].perm)) {
      return props.children
    }
  }
  return null
}

export default connect(state => ({currentRole: state.user.roles}), () => ({}))(Role)
