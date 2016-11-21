import React, {Component} from "react"
import KeyHandler from "react-key-handler"
import app from "../client/feathers"

import Toolbar from "../components/Toolbar"
import Button from "../components/Button"
import Paper from "../components/Paper"
import Grid from "../components/Grid"
import Fab from "../components/Fab"
import TextField from "../components/TextField"
import Fa from "../components/Fa"
import ContentEditor from "../components/ContentEditor"
import Upload from "../components/Upload"

import {PRIMARY_COLOR, SECONDARY_COLOR} from "../constants/visual"
import {LESSON_API, CLASS_URL} from "../constants/api"

const COMPONENT_LIST = ["card", "cover", "quiz", "media", "embed"]

const COMPONENT_TRANSLATION = {
  card: "การ์ด",
  cover: "โคฟเวอร์",
  quiz: "ควิซ",
  media: "มีเดีย",
  embed: "ฝัง"
}

const LESSON_INFO = [{
  n: "name",
  t: "ชื่อบทเรียน"
}, {
  n: "description",
  t: "คำอธิบายสั้นๆ"
}, {
  n: "thumbnail",
  t: "รูปภาพประกอบ"
}]

const cardTitleStyle = {
  padding: "1em",
  color: "rgb(254, 254, 254)",
  fontSize: "1.15em",
  background: PRIMARY_COLOR
}

export default class LessonEditor extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: "",
        description: "",
        thumbnail: "",
        url: "",
        content: []
      }
    }
  }

  componentDidMount() {
    app.service(LESSON_API)
      .find({query: {url: this.props.params.id}})
      .then(e => this.setState({data: e.data[0]}))
      .catch(e => swal("Error", e, "error"))
  }

  submit = () => {
    app.service(LESSON_API)
    .patch(this.state.data._id, this.state.data)
    .catch(e => swal("Error", e, "error"))
  }

  move = (oldIndex, newIndex) => {
    const data = this.state.data
    data.content.splice(newIndex, 0, data.content.splice(oldIndex, 1)[0])
    this.setState({data: data})
  }

  new = (type) => {
    const data = this.state.data
    data.content.push({type: type})
    this.setState({data: data})
  }

  update = (value, target, index) => {
    const data = this.state.data
    data.content[index][target] = value
    this.setState({data: data})
  }

  remove = (index) => {
    const data = this.state.data
    data.content.splice(index, 1)
    this.setState({data: data})
  }

  set = (name, value) => {
    const data = this.state.data
    data[name] = value
    this.setState({data: data})
  }

  deleteLesson = () => {
    swal({
      title: "Delete this lesson?",
      text: "You will NOT be able to recover it!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: SECONDARY_COLOR,
      confirmButtonText: "Yes.",
      closeOnConfirm: false
    }, () => {
      swal("Deleted!", "This lesson has been deleted.", "success")
      app.service(LESSON_API)
      .remove(this.state.data._id)
      .then(x => {
        console.log("DEL", x)
        this.context.router.transitionTo(`${CLASS_URL}${x.parentCourse}`)
      })
      .catch(e => swal("Error", e, "error"))
    })
  }

  uploadThumbnail = e => {
    this.set("thumbnail", `/uploads/${e}`)
    this.submit()
  }

  render = () => (
    <div>
      <Toolbar title="ตัวช่วยสร้างบทเรียน" />
      <Grid c style={{paddingTop: "6em"}}>
        <Grid r c>
          <Paper bottom="0em" style={{marginTop: "2em"}}>
            <Grid r>
              <Grid md="12">
                <Fab
                  onClick={this.deleteLesson}
                  position="absolute"
                  top="-2.3em"
                  right="1em"
                  bottom="auto"
                  secondary
                >
                  <Fa i="trash" />
                </Fab>
              </Grid>
            </Grid>
            <Grid r>
              {
                LESSON_INFO.map((item, index) => {
                  if (item.n === "thumbnail") {
                    return (
                      <Grid xs="12" sm="4" md="4" lg="4" key={index}>
                        <Upload result={this.uploadThumbnail} />
                      </Grid>
                    )
                  } else {
                    return (
                      <Grid xs="12" sm="4" md="4" lg="4" key={index}>
                        <TextField
                          value={this.state.data[item.n]}
                          onChange={v => this.set(item.n, v.target.value)}
                          placeholder={item.t}
                          onKeyPress={v => { v.key === "Enter" && this.submit() }}
                        />
                      </Grid>
                    )
                  }
                })
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid c r>
          <div>
            {
              this.state.data.content.map((item, i) => (
                <div key={i}>
                  <Paper
                    style={{marginTop: "3.5em"}}
                    outerChild={
                      <div style={cardTitleStyle}>
                        เพิ่ม{COMPONENT_TRANSLATION[item.type]}
                      </div>
                    }
                  >
                    <Grid r>
                      {
                        [{
                          secondary: true,
                          click: () => this.remove(i),
                          right: "1em",
                          icon: "trash"
                        }, {
                          secondary: false,
                          click: () => this.move(i, i + 1),
                          right: "4.5em",
                          icon: "arrow-down"
                        }].map((e, index) => (
                          <Grid md="12" key={index}>
                            <Fab
                              onClick={e.click}
                              position="absolute"
                              top="-4em"
                              secondary={e.secondary}
                              right={e.right}
                              bottom="auto"
                              className="handle"
                            >
                              <Fa i={e.icon} />
                            </Fab>
                          </Grid>
                        ))
                      }
                    </Grid>
                    <ContentEditor
                      item={item}
                      data={this.state.data.content[i]}
                      index={i}
                      update={this.update}
                      submit={this.submit}
                      url={this.props.params.id}
                    />
                  </Paper>
                </div>
              ))
            }
          </div>
        </Grid>
        <div style={{marginTop: "1em"}}>
          <Paper>
            <Grid r>
              {
                COMPONENT_LIST.map((item, index) => (
                  <Grid xs="3" key={index}>
                    <Button
                      width="100%"
                      onClick={() => this.new(item)}
                      large
                    >
                      {COMPONENT_TRANSLATION[item]}
                    </Button>
                  </Grid>
                ))
              }
            </Grid>
          </Paper>
        </div>
      </Grid>
      <KeyHandler
        keyEventName="keydown"
        keyValue="Control"
        onKeyHandle={this.submit}
      />
      <Fab onClick={this.submit} secondary>
        <Fa i="floppy-o" />
      </Fab>
    </div>
  )

}
