import React from "react"

import Grid from "./Grid"
import RoundIcon from "./RoundIcon"

import {DEFAULT_PROFILE} from "../constants/visual"

const nameText = {
  marginTop: "-0.5em",
  fontSize: "1em",
  textAlign: "center"
}

const StudentList = (props) => (
  <div>
    {
      props.data.map((x, i) => (
        <Grid xs={6} sm={3} md={2} key={i + 1}>
          <RoundIcon src={x.photo || DEFAULT_PROFILE} size="4em" onClick={() => (props.onClick)(x._id)} />
          <p style={nameText} onClick={() => (props.onClick)(x._id)}>
            <span style={{fontWeight: props.user._id === x._id && 500}}>
              {x.username}
            </span>
          </p>
        </Grid>
      ))
    }
  </div>
)

export default StudentList
