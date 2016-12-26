import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import Grid from "./Grid"
import Paper from "./Paper"

import {services} from "../client/api"
import {DEFAULT_IMAGE} from "../constants/visual"

const h2 = {
  margin: 0,
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

const link = {
  textDecoration: "none",
  color: "#222"
}

const card = {
  minHeight: "12em"
}

const Course = props => (
  <div>
    {props.class && (
      <div style={{marginBottom: "2em"}}>
        <Paper
          depth="z"
          cover={{src: props.class.thumbnail, height: "30%", alpha: 0.2}}
          tStyle={fixedTitle}
          title={props.class._id}
        >
          <Grid c>
            <h2 style={h2}>{props.class.name}</h2>
            <h3 style={h3}>{props.class.description}</h3>
            <h4 style={h3}>
              Taught by:
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
      <Grid r>
        {props.lessons && props.lessons.data.map((item, i) => (
          <Grid style={{marginBottom: "2em"}} xs={12} sm={6} md={4} key={i}>
            <Paper
              depth="z"
              footer="Edit"
              fSuccess
              title={item._id}
              tStyle={fixedTitle}
              cardStyle={card}
              cover={{
                src: item.thumbnail || DEFAULT_IMAGE,
                height: "20%"
              }}
            >
              <Link
                to={`/notes/${item._id}`}
                onClick={() => props.link(item._id)}
                style={link}
              >
                <h2 style={h2}>{item.name}</h2>
                <h3 style={h3}>{item.description}</h3>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
  lessons: state.lessons.queryResult,
  class: state.classes.data,
})

const mapDispatchToProps = dispatch => ({
  reml: id => dispatch(services.lessons.remove(id)),
  link: id => dispatch(services.lessons.get(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)
