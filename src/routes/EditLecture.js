import React, {Component} from "react"
import {connect} from "react-redux"

import Content from "../components/Content"
import Shadow from "../components/Shadow"
import Grid from "../components/Grid"

import {services, reAuth} from "../client/api"

const mapStateToProps = state => ({
  lessons: state.lessons.data
})

const mapDispatchToProps = (dispatch, props) => ({
  load: () => dispatch(services.lessons.get(props.params.id))
})

@connect(mapStateToProps, mapDispatchToProps)
export default class EditLecture extends Component {

  componentDidMount = () => {
    reAuth()
    this.props.load()
  }

  render = () => (
    <div>
      <div>
        <Grid style={{marginTop: "2em"}} c n>
          <h2>[EDIT MODE]</h2>
          {this.props.lessons && (
            <div>
              <h2>{this.props.lessons.name}</h2>
              <h3>{this.props.lessons.description}</h3>
              <h3>{this.props.lessons.parentCourse.name}</h3>
            </div>
          )}
        </Grid>
      </div>
      <div style={{outline: 0}} contentEditable>
        {this.props.lessons && this.props.lessons.content.map((e, i) => (
          <Grid c={e.type !== "cover"} key={i} n>
            <Shadow depth={e.type === "card" ? "z-0" : "z-flow"}>
              <Content {...e} />
            </Shadow>
          </Grid>
        ))}
      </div>
    </div>
  )

}
