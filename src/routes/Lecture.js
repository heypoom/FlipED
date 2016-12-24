import React, {Component} from "react"
import {connect} from "react-redux"

import Content from "../components/Content"
import Shadow from "../components/Shadow"
import Grid from "../components/Grid"

import {services, reAuth} from "../client/api"

const mapStateToProps = state => ({
  lesson: state.lesson.data
})

const mapDispatchToProps = (dispatch, props) => ({
  load: () => dispatch(services.lesson.get(props.params.id))
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Lecture extends Component {

  componentDidMount = () => {
    reAuth()
    this.props.load()
  }

  render = () => (
    <div>
      {this.props.lesson && this.props.lesson.content.map((e, i) => (
        <Grid
          style={{marginTop: "2em"}}
          c={e.type !== "cover"}
          key={i}
          n
        >
          <Shadow depth={e.type === "card" ? "z-0" : "z-flow"}>
            <Content {...e} />
          </Shadow>
        </Grid>
      ))}
    </div>
  )

}
