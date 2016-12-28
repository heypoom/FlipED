import React, {Component} from "react"
import {connect} from "react-redux"
import {push} from "connected-react-router"
import Editable from "react-contenteditable"

import Fab from "material-ui/FloatingActionButton"
import CheckIcon from "material-ui/svg-icons/navigation/check"
import TextIcon from "material-ui/svg-icons/content/text-format"
import PhotoIcon from "material-ui/svg-icons/image/add-a-photo"
import CoverIcon from "material-ui/svg-icons/image/gradient"
import VideoIcon from "material-ui/svg-icons/notification/ondemand-video"
import QuizIcon from "material-ui/svg-icons/action/note-add"
import EmbedIcon from "material-ui/svg-icons/content/create"

// action/note-add action/add-alert content/add content/clear content/create

import ContentEditor from "../components/ContentEditor"
import Shadow from "../components/Shadow"
import Grid from "../components/Grid"
import Role from "../components/Role"
import Paper from "../components/Paper"
import Navbar from "../components/Navbar"

import {setEditor, loadEditor, addElement, removeElement} from "../actions/editor"
import {setTemp} from "../actions/app"
import {services} from "../client/api"

const component = [{
  item: "card",
  icon: TextIcon
}, {
  item: "image",
  icon: PhotoIcon
}, {
  item: "cover",
  icon: CoverIcon
}, {
  item: "youtube",
  icon: VideoIcon
}, {
  item: "quiz",
  icon: QuizIcon
}, {
  item: "embed",
  icon: EmbedIcon
}]

/*
  <div style={{position: "fixed", left: 0, top: "10%"}}>
    <Paper>
      {component.map((e, i) => (
        <div style={{marginBottom: "1.5em"}} key={i}>
          <Fab backgroundColor={bg} onClick={() => this.props.add(e.item)} mini>
            <e.icon />
          </Fab>
        </div>
      ))}
    </Paper>
  </div>
*/

const h1 = {
  fontWeight: 300
}

const h3 = {
  color: "grey",
  fontWeight: 300
}

const bg = "#2d2d30"

const mapStateToProps = state => ({
  lessons: state.lessons.data,
  editor: state.editor,
  temp: state.app.temp || {}
})

const mapDispatchToProps = (dispatch, props) => ({
  set: (index, key, value) => dispatch(setEditor(props.params.id, index, key, value)),
  load: data => dispatch(loadEditor(props.params.id, data)),
  publish: (data, prop) => {
    dispatch(services.lessons.patch(props.params.id, {...prop, content: data}))
    dispatch(push(`/notes/${props.params.id}`))
  },
  add: type => dispatch(addElement(props.params.id, {type})),
  remove: index => dispatch(removeElement(props.params.id, index)),
  setProps: (key, value, temp) => dispatch(setTemp(props.params.id, {
    ...temp[props.params.id], [key]: value
  }))
})

@connect(mapStateToProps, mapDispatchToProps)
export default class EditLecture extends Component {

  componentDidMount() {
    if (this.props.lessons)
      this.props.load(this.props.lessons.content)
  }

  save = () => this.props.publish(
    this.props.editor[this.props.params.id],
    this.props.temp[this.props.params.id]
  )

  edit = (field, e) => this.props.setProps(field, e.target.value, this.props.temp)

  render = () => {
    const editor = this.props.editor[this.props.params.id]
    const lessons = this.props.lessons
    return (
      <div>
        <Navbar />
        <div>
          {lessons && (
            <Grid style={{paddingTop: "2em"}} c n>
              <h1 style={h1}>
                <Editable
                  html={lessons.name}
                  onChange={e => this.edit("name", e)}
                />
              </h1>
              <h3 style={{...h3, lineHeight: "1.3em"}}>
                <Editable
                  html={lessons.description}
                  onChange={e => this.edit("description", e)}
                />
              </h3>
              <h3 style={h3}>
                <span>{lessons.parentCourse.name}</span>
              </h3>
            </Grid>
          )}
        </div>
        <div>
          {editor && editor.map((e, i) => (
            <Grid key={i} c={!e.full && e.type !== "cover"} n>
              <Shadow
                style={{margin: "1em 0em", position: "relative"}}
                depth={e.type === "card" ? "z-0" : "z-1"}
              >
                <ContentEditor
                  set={(k, v) => this.props.set(i, k, v)}
                  remove={() => this.props.remove(i)}
                  {...e}
                />
              </Shadow>
            </Grid>
          ))}
        </div>
        <div>
          <Grid n c>
            <Grid r>
              <Paper cardStyle={{height: "5em"}}>
                {component.map((e, i) => (
                  <Grid xs={12} sm={6} md={3} lg={2} key={i}>
                    <Fab backgroundColor={bg} onClick={() => this.props.add(e.item)} mini>
                      <e.icon />
                    </Fab>
                  </Grid>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Role is="teacher">
          <div style={{position: "fixed", right: "1em", bottom: "1em"}}>
            <Fab onClick={this.save} backgroundColor="#2d2d30">
              <CheckIcon />
            </Fab>
          </div>
        </Role>
      </div>
    )
  }

}
