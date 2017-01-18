import React from "react"
import {connect} from "react-redux"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"

import Grid from "../Grid"
import Icon from "../Icon"

import {sort} from "../../actions/search"

import s from "./CourseList.scss"

const CourseHeader = ({text, success, handleSort, user}) => (
  <Grid r>
    <Grid xs={12}>
      <div className={c(s.cardTop, success && s.success)}>
        <span>{text}</span>
        <Tooltip place="top" type="dark" effect="float" />
        <div
          data-tip={`เปลี่ยนการเรียงลำดับสำหรับ ${text}`}
          className={s.cardTopIcon}
          onClick={() => handleSort(user)}
        >
          <Icon i="moreVert" />
        </div>
      </div>
    </Grid>
  </Grid>
)

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  handleSort: user => dispatch(sort("classes", {
    $or: [
      {owner: {$in: [user._id]}},
      {students: {$in: [user._id]}},
    ]
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CourseHeader))
