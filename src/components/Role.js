import {connect} from "react-redux"

import {isPermitted} from "../core/helper"

/**
  @module Role
  @desc Checks if the user has the sufficient permission to render the children
  @param role: Enum - User's role
  @param is - Checks if role is more than or equal
  @param only - Checks for exact role match
  @param less - Checks for lower roles
*/

const Role = props => isPermitted({...props}) && props.children

const mapStateToProps = state => ({
  role: state.user.roles
})

export default connect(mapStateToProps)(Role)
