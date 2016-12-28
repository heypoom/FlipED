import React from "react"
import {connect} from "react-redux"

import Grid from "./Grid"
import Paper from "./Paper"
import Cover from "./Cover"
import LectureList from "./LectureList"
import Stats from "./Stats"

const h2 = {
  margin: 0,
  fontWeight: 300,
  lineHeight: "1.1em"
}

const h3 = {
  lineHeight: "1.48em",
  color: "grey",
  fontWeight: 300,
  fontSize: "1.1em",
  margin: "0.6em 0"
}

const fixedTitle = {
  background: "transparent",
  position: "absolute",
  top: 0
}

const Course = props => (
  <div>
    {props.class && (
      <div style={{marginBottom: "2em"}}>
        <Cover src={props.class.thumbnail} height="40%" alpha={0.2} />
        <Paper depth="z" tStyle={fixedTitle} title={props.class._id}>
          <Grid c>
            <h2 style={h2}>{props.class.name}</h2>
            <h3 style={h3}>{props.class.description}</h3>
            <h4 style={h3}>
              สอนโดย
              {props.class.owner ? props.class.owner.map((e, i) => (
                <span style={{textTransform: "capitalize"}} key={i}>
                  &nbsp;{e.username}{i !== props.class.owner.length - 1 && ","}
                </span>
              )) : " -"}
            </h4>
          </Grid>
        </Paper>
      </div>
    )}
    <Grid c>
      <LectureList />
      <Stats />
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
  class: state.classes.data
})

export default connect(mapStateToProps)(Course)
