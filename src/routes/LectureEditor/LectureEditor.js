import React, {Component} from "react"
import {connect} from "react-redux"
import {push} from "connected-react-router"
import {HotKeys} from "react-hotkeys"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Fab from "material-ui/FloatingActionButton"
import DeleteIcon from "material-ui/svg-icons/action/delete"
import SaveIcon from "material-ui/svg-icons/content/save"
import PhotoIcon from "material-ui/svg-icons/image/add-a-photo"
import InfoIcon from "material-ui/svg-icons/action/info"

import ContentEditor from "../../components/ContentEditor"
import Shadow from "../../components/Shadow"
import Grid from "../../components/Grid"
import Role from "../../components/Role"
import Paper from "../../components/Paper"
import Navbar from "../../components/Navbar"
import Upload from "../../components/Upload"

import {setEditor, loadEditor, addElement, removeElement} from "../../actions/editor"
import {services} from "../../client/api"
import components from "../../constants/content"

import s from "./LectureEditor.scss"

const bg = "#2d2d30"

const mapStateToProps = state => ({
  lessons: state.lessons.data,
  editor: state.editor,
  temp: state.app.temp || {}
})

const mapDispatchToProps = (dispatch, props) => ({
  init: () => {
    dispatch(services.lessons.get(props.params.id))
  },
  set: (index, key, value) => dispatch(setEditor(props.params.id, index, key, value)),
  load: data => dispatch(loadEditor(props.params.id, data)),
  publish: (data, prop) => dispatch(services.lessons.patch(props.params.id, {
    ...prop, content: data
  })),
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
    this.state = props.lessons ? {
      name: props.lessons.name,
      description: props.lessons.description,
      thumbnail: props.lessons.thumbnail
    } : {}
  }

  componentDidMount() {
    if (this.props.lessons) {
      this.props.load(this.props.lessons.content)
    } else {
      this.props.init()
    }
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
                  <textarea
                    className="inlineInput"
                    style={{color: "grey"}}
                    value={this.state.description}
                    onChange={e => this.edit("description", e.target.value)}
                  />
                </h3>
                {this.props.lessons.parentCourse && (
                  <h3 className={s.h3}>
                    {this.props.lessons.parentCourse.name}
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
            <Paper>
              <Grid style={{marginBottom: "-1em"}} tc r>
                {Object.keys(components).map(sets => components[sets].map((item, i) => (
                  <Grid xs={4} sm={2} style={{marginBottom: "1em"}} key={i}>
                    <Fab backgroundColor={bg} onClick={() => this.props.add(item.id)} mini>
                      {item.icon ? <item.icon /> : <InfoIcon />}
                    </Fab>
                  </Grid>
                )))}
              </Grid>
            </Paper>
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
