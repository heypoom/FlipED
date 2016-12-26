import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import Grid from "./Grid"
import Paper from "./Paper"

import {services} from "../client/api"

const Course = props => (
  <div>
    {props.class && (
      <Grid r>
        <Grid style={{marginBottom: "2em"}} xs={12}>
          <Paper depth="z" cover={{src: props.class.thumbnail, height: "30%"}} anim>
            <h2 style={{margin: 0}}>{props.class.name}</h2>
            <h3>{props.class.description}</h3>
            <small>{JSON.stringify(props.class._id)}</small>
          </Paper>
        </Grid>
      </Grid>
    )}
    <Grid r>
      {props.lessons && props.lessons.data.map((item, i) => (
        <Grid style={{marginBottom: "2em"}} xs={12} key={i}>
          <Paper depth="z" footer="Delete" fClick={() => props.reml(item._id)}>
            <Link to={`/notes/${item._id}`}>
              {item.name} {JSON.stringify(item._id)}
            </Link>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
  lessons: state.lessons.queryResult,
  class: state.classes.data,
})

const mapDispatchToProps = dispatch => ({
  reml: id => dispatch(services.lessons.remove(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)
