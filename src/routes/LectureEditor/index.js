import React, {Component} from "react"
import {connect} from "react-redux"
import {push} from "connected-react-router"
import {HotKeys} from "react-hotkeys"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"

import Fab from "material-ui/FloatingActionButton"
import DeleteIcon from "material-ui/svg-icons/action/delete"
import SaveIcon from "material-ui/svg-icons/content/save"
import PhotoIcon from "material-ui/svg-icons/image/add-a-photo"
import InfoIcon from "material-ui/svg-icons/action/info"

import ContentEditor from "../../components/ContentEditor"
import Shadow from "../../components/Shadow"
import Grid from "../../components/Grid"
import Paper from "../../components/Paper"
import Navbar from "../../components/Navbar"
import Upload from "../../components/Upload"

import {setEditor, loadEditor, addElement, removeElement} from "../../actions/editor"
import {services} from "../../client/api"
import comps from "../../constants/content"

import s from "./LectureEditor.scss"

const bg = "#009688"

const AddContent = ({icon: CompIcon = InfoIcon, add, id, name}) => (
  <Grid xs={4} sm={2} style={{marginBottom: "1em"}}>
    <Fab data-tip={`เพิ่ม${name}`} onClick={() => add(id)} backgroundColor={bg} mini>
      <CompIcon />
    </Fab>
  </Grid>
)

const AddContents = ({add, of}) => (
  <Grid style={{marginBottom: "-1em", textAlign: "center"}} r>
    {comps.default.map((item, i) => (
      <AddContent add={add} {...item} key={i} />
    ))}
    {comps[of] && comps[of].map((item, i) => (
      <AddContent add={add} {...item} key={i} />
    ))}
  </Grid>
)

/*
  const TreeDebugger = ({data = []}) => (
    <Grid style={{position: "absolute", right: 0, width: "280px"}} c>
      <pre style={{whiteSpace: "pre-wrap", lineHeight: "1.5em", fontSize: "0.7em"}}>
        <code
          dangerouslySetInnerHTML={{__html: JSON.stringify(
            data, null, 4
          )}}
        />
      </pre>
    </Grid>
  )
*/

const Editor = ({data = [], set, remove}) => (
  <div>
    {
      data.map((item, i) => (
        <Grid className={s.obj} key={i} c={!item.full && item.type !== "cover"} n>
          <Tooltip place="top" type="dark" effect="float" />
          <ContentEditor
            set={(key, val) => set(i, key, val)}
            remove={() => remove(i)}
            {...item}
          />
        </Grid>
      ))
    }
  </div>
)

const mapStateToProps = state => ({
  lessons: state.lessons.data || {},
  course: state.lessons.data ? (state.lessons.data.course || {}) : {},
  editor: state.editor
})

const mapDispatchToProps = (dispatch, props) => ({
  init: () => dispatch(services.lessons.get(props.params.id)),
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
      thumbnail: props.lessons.thumbnail,
      course: props.lessons.course
    } : {}
  }

  componentDidMount() {
    if (this.props.lessons)
      this.props.load(this.props.lessons.content)
    else
      this.props.init()
  }

  save = () => this.props.publish(
    this.props.editor[this.props.params.id],
    this.state
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
    <div className={s.root}>
      <Tooltip place="top" type="dark" effect="float" />
      <HotKeys handlers={this.handlers}>
        <Navbar />
        <div className={s.infoEditor}>
          <div className={s.left}>
            <Upload result={id => this.edit("thumbnail", id)}>
              <Fab data-tip="อัพโหลดรูปหน้าปก" mini>
                <PhotoIcon />
              </Fab>
            </Upload>
          </div>
          <div className={s.right}>
            <Fab data-tip="ลบเนื้อหาโดยถาวร" onClick={this.props.delete} secondary mini>
              <DeleteIcon />
            </Fab>
          </div>
          <Grid c n>
            <h1 className={s.h1}>
              <input
                className="inlineInput"
                value={this.state.name}
                onChange={e => this.edit("name", e.target.value)}
              />
            </h1>
            <h3 className={s.h3}>
              <input
                className="inlineInput"
                style={{color: "grey"}}
                value={this.state.description}
                onChange={e => this.edit("description", e.target.value)}
              />
            </h3>
            <h3 className={s.h3}>
              {this.props.course.name || this.state.course.name || ""}
            </h3>
          </Grid>
        </div>
        <Editor
          data={this.props.editor[this.props.params.id]}
          set={this.props.set}
          remove={this.props.remove}
        />
        <div className={s.addContent}>
          <Grid n c>
            <Paper>
              <AddContents of={this.props.course.subject} add={this.props.add} />
            </Paper>
          </Grid>
        </div>
        <div className={s.fab}>
          <Fab data-tip="บันทึกเนื้อหา" onClick={this.saveBtn}>
            <SaveIcon />
          </Fab>
        </div>
      </HotKeys>
    </div>

  )

}
