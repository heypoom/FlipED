import React, {Component} from "react"
import {connect} from "react-redux"
import {HotKeys} from "react-hotkeys"
import {Redirect} from "react-router"
import {push} from "connected-react-router"

import Fab from "material-ui/FloatingActionButton"
import SaveIcon from "material-ui/svg-icons/content/save"

import Grid from "../components/Grid"
import Paper from "../components/Paper"
import Cover from "../components/Cover"
import Role from "../components/Role"
import LectureList from "../components/LectureList"
import CourseEditor from "../components/CourseEditor"
import Navbar from "../components/Navbar"

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

const cover = {
  height: "13em",
  alpha: 0.2,
  attachment: "fixed",
  depth: "z-1"
}

const CourseHeader = ({c = {}}) => (
  <Role only="student">
    <div>
      <Cover src={c.thumbnail} {...cover} />
      <Paper>
        <Grid c>
          <h2 style={h2}>{c.name}</h2>
          <h3 style={h3}>{c.description}</h3>
          <h4 style={h3}>
            สอนโดย
            {c.owner ? c.owner.map((e, i) => (
              <span style={{textTransform: "capitalize"}} key={i}>
                &nbsp;{e.username}{i !== c.owner.length - 1 && ","}
              </span>
            )) : " -"}
          </h4>
        </Grid>
      </Paper>
    </div>
  </Role>
)

const mapStateToProps = state => ({
  user: state.user || {},
  class: state.classes.data || {},
  loaded: state.classes.isFinished
})

const mapDispatchToProps = dispatch => ({
  edit: (id, temp) => dispatch(services.classes.patch(id, temp)),
  remove: id => {
    dispatch(services.classes.remove(id))
    dispatch(push("/courses"))
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

  set = (key, e) => this.setState({[key]: e})

  remove = () => this.props.remove(this.props.class._id)

  render = () => {
    if (this.props.user.state) {
      if (this.props.user.state.CURRENT_COURSE) {
        return (
          <div>
            <HotKeys handlers={this.handlers}>
              <Navbar />
              <CourseHeader c={this.props.class} />
              <CourseEditor
                c={this.state || this.props.class}
                set={this.set}
                remove={this.remove}
                cover={cover}
              />
              <Grid style={{marginTop: "2em"}} c>
                {this.props.class && (
                  <LectureList classId={this.props.class._id} />
                )}
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
          </div>
        )
      }
    }
    return (
      <Redirect
        to={{
          pathname: "/courses",
          state: {from: "/course"}
        }}
      />
    )
  }

}
