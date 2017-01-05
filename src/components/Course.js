import React, {Component} from "react"
import {connect} from "react-redux"
import {HotKeys} from "react-hotkeys"

import Fab from "material-ui/FloatingActionButton"
import SaveIcon from "material-ui/svg-icons/content/save"

import Grid from "./Grid"
import Paper from "./Paper"
import Cover from "./Cover"
import Role from "./Role"
import LectureList from "./LectureList"
import CourseEditor from "./CourseEditor"

import {setUi} from "../actions/app"
import {services} from "../client/api"

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

const mapStateToProps = state => ({
  user: state.user,
  class: state.classes.data,
  loaded: state.classes.isFinished
})

const mapDispatchToProps = dispatch => ({
  edit: (id, temp) => dispatch(services.classes.patch(id, temp)),
  remove: id => {
    dispatch(services.classes.remove(id))
    dispatch(setUi("courseEdit", false))
    dispatch(setUi("dashTab", "courses"))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Course extends Component {

  constructor(props) {
    super(props)
    this.state = props.class ? {
      name: props.class.name,
      description: props.class.description,
      thumbnail: props.class.thumbnail,
      owner: props.class.owner
    } : {}
  }

  save = () => this.props.edit(this.props.class._id, this.state)

  handlers = {
    save: e => {
      e.preventDefault()
      this.save()
    }
  }

  set = (key, e) => {
    this.setState({[key]: e})
    /*
      NOTE: too laggy
      if (key === "thumbnail")
        this.save()
    */
  }

  remove = () => this.props.remove(this.props.class._id)

  load = () => {
    this.setState(this.props.class)
    return this.props.class
  }

  render = () => (this.props.class ? (
    <HotKeys handlers={this.handlers}>
      <Role is="teacher">
        <div>
          {this.props.loaded && (
            <CourseEditor
              classes={this.state.name ? this.state : this.load()}
              set={this.set}
              remove={this.remove}
            />
          )}
        </div>
      </Role>
      <Role only="student">
        <div>
          <Cover
            src={this.props.class.thumbnail}
            height="40%" alpha={0.2} attachment="fixed"
          />
          <Paper>
            <Grid c>
              <h2 style={h2}>{this.props.class.name}</h2>
              <h3 style={h3}>{this.props.class.description}</h3>
              <h4 style={h3}>
                สอนโดย
                {this.props.class.owner ? this.props.class.owner.map((e, i) => (
                  <span style={{textTransform: "capitalize"}} key={i}>
                    &nbsp;{e.username}{i !== this.props.class.owner.length - 1 && ","}
                  </span>
                )) : " -"}
              </h4>
            </Grid>
          </Paper>
        </div>
      </Role>
      <Grid style={{marginTop: "2em"}} c>
        <LectureList classId={this.props.class._id} />
      </Grid>
      <Role is="teacher">
        <div style={{position: "fixed", right: "1em", bottom: "1em", zIndex: 1}}>
          <Fab
            onClick={this.save}
            backgroundColor="#2d2d30"
          >
            <SaveIcon />
          </Fab>
        </div>
      </Role>
    </HotKeys>
  ) : (
    <div>No Course Selected...</div>
  ))

}
