import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import Grid from "./Grid"
import Paper from "./Paper"
import Role from "./Role"

import {services} from "../client/api"
import {DEFAULT_IMAGE} from "../constants/visual"

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

const link = {
  textDecoration: "none",
  color: "#222"
}

const card = {
  minHeight: "12em"
}

const grid = {
  style: {marginBottom: "2em"},
  xs: 12,
  sm: 6,
  md: 4,
  lg: 4
}

const LectureList = props => (
  <Grid r>
    <Role is="teacher">
      <Grid {...grid}>
        <Paper
          cardStyle={card}
          cover={{src: DEFAULT_IMAGE, height: "25%"}}
          footer="สร้างเลย"
          fClick={props.create}
        >
          <h2 style={h2}>สร้างบทเรียน</h2>
          <h3 style={h3}>....</h3>
        </Paper>
      </Grid>
    </Role>
    {props.lessons && props.lessons.data.map((item, i) => (
      <Grid key={i} {...grid}>
        <Link
          to={`/notes/${item._id}`}
          onClick={() => props.link(item._id)}
          style={link}
        >
          <Paper
            cardStyle={card}
            cover={{
              src: item.thumbnail || DEFAULT_IMAGE,
              height: "25%"
            }}
            footer="View"
            fSuccess
          >
            <h2 style={h2}>{item.name}</h2>
            <h3 style={h3}>{item.description}</h3>
          </Paper>
        </Link>
      </Grid>
    ))}
  </Grid>
)

const mapStateToProps = state => ({
  user: state.user || {},
  lessons: state.lessons.queryResult
})

const mapDispatchToProps = (dispatch, props) => ({
  reml: id => dispatch(services.lessons.remove(id)),
  link: id => dispatch(services.lessons.get(id)),
  create: () => dispatch(services.lessons.create({
    name: "บทเรียนใหม่",
    description: "คำอธิบายบทเรียน",
    content: [{type: "card", content: "ยินดีต้อนรับครับ"}],
    parentCourse: props.classId,
    thumbnail: DEFAULT_IMAGE
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(LectureList)
