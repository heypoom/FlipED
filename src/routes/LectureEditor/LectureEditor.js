import React, {Component} from "react"
import {connect} from "react-redux"
import {push} from "connected-react-router"
import {HotKeys} from "react-hotkeys"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Fab from "material-ui/FloatingActionButton"
import DeleteIcon from "material-ui/svg-icons/action/delete"
import SaveIcon from "material-ui/svg-icons/content/save"
import TextIcon from "material-ui/svg-icons/content/text-format"
import PhotoIcon from "material-ui/svg-icons/image/add-a-photo"
import CoverIcon from "material-ui/svg-icons/image/gradient"
import VideoIcon from "material-ui/svg-icons/notification/ondemand-video"
import QuizIcon from "material-ui/svg-icons/action/note-add"
import EmbedIcon from "material-ui/svg-icons/content/create"
// import CheckIcon from "material-ui/svg-icons/navigation/check"

import ContentEditor from "../../components/ContentEditor"
import Shadow from "../../components/Shadow"
import Grid from "../../components/Grid"
import Role from "../../components/Role"
import Paper from "../../components/Paper"
import Navbar from "../../components/Navbar"
import Upload from "../../components/Upload"

import {setEditor, loadEditor, addElement, removeElement} from "../../actions/editor"
import {services} from "../../client/api"

import s from "./LectureEditor.scss"

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
  },
  back: () => dispatch(push(`/notes/${props.params.id}`)),
  add: type => dispatch(addElement(props.params.id, {type})),
  remove: index => dispatch(removeElement(props.params.id, index)),
  delete: () => {
    dispatch(services.lessons.remove(props.params.id))
    dispatch(push("/"))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(s)
export default class LectureEditor extends Component {

  constructor(props) {
    super(props)
    if (props.lessons) {
      this.state = {
        name: props.lessons.name,
        description: props.lessons.description,
        thumbnail: props.lessons.thumbnail
      }
    } else {
      this.state = {}
    }
  }

  componentDidMount() {
    if (this.props.lessons)
      this.props.load(this.props.lessons.content)
  }

  save = () => this.props.publish(
    this.props.editor[this.props.params.id], this.state
  )

  saveBtn = () => {
    this.save()
    this.props.back()
  }

  edit = (field, e) => this.setState({[field]: e})

  handlers = {
    save: e => {
      e.preventDefault()
      this.save()
    }
  }

  render = () => (
    <HotKeys handlers={this.handlers}>
      <div className={s.root}>
        <Navbar />
        <div style={{paddingTop: "2em"}}>
          <div style={{position: "absolute", right: "3%"}}>
            <Fab onClick={this.props.delete} secondary mini>
              <DeleteIcon />
            </Fab>
          </div>
          <div style={{position: "absolute", left: "3%"}}>
            <Upload result={id => this.edit("thumbnail", `/uploads/${id}`)}>
              <Fab backgroundColor={bg} mini><PhotoIcon /></Fab>
            </Upload>
          </div>
          <div>
            {this.props.lessons && (
              <Grid c n>
                <h1 className={s.h1}>
                  <input
                    className="inlineInput"
                    value={this.state.name}
                    onChange={e => this.edit("name", e.target.value)}
                  />
                </h1>
                <h3 className={s.h3} style={{lineHeight: "1.3em"}}>
                  <input
                    className="inlineInput"
                    style={{color: "grey"}}
                    value={this.state.description}
                    onChange={e => this.edit("description", e.target.value)}
                  />
                </h3>
                {this.state.parentCourse && (
                  <h3 className={s.h3}>
                    {this.state.parentCourse.name}
                  </h3>
                )}
              </Grid>
            )}
          </div>
        </div>
        <div>
          {
            this.props.editor[this.props.params.id] &&
            this.props.editor[this.props.params.id].map((e, i) => (
              <Grid key={i} c={!e.full && e.type !== "cover"} n>
                <Shadow className={s.obj} depth={e.type === "card" ? "z-0" : "z-1"}>
                  <ContentEditor
                    set={(k, v) => this.props.set(i, k, v)}
                    remove={() => this.props.remove(i)}
                    {...e}
                  />
                </Shadow>
              </Grid>
            ))
          }
        </div>
        <div className={s.addContent}>
          <Grid n c>
            <Grid r>
              <Paper cardStyle={{height: "5em"}}>
                {component.map((e, i) => (
                  <Grid xs={4} sm={2} style={{marginBottom: "1em"}} key={i}>
                    <Fab
                      backgroundColor={bg}
                      onClick={() => this.props.add(e.item)}
                      mini
                    >
                      <e.icon />
                    </Fab>
                  </Grid>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Role is="teacher">
          <div className={s.fab}>
            <Fab onClick={this.saveBtn} backgroundColor="#2d2d30">
              <SaveIcon />
            </Fab>
          </div>
        </Role>
      </div>
    </HotKeys>
  )

}
