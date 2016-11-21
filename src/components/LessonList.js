import React, {Component} from "react"
import {Link} from "react-router"
import {connect} from "redux-await"

import concat from "lodash.concat"
import reject from "lodash.reject"

import GridList from "./GridList"
import Paper from "./Paper"
import TextField from "./TextField"
import Grid from "./Grid"
import Role from "./Role"

import app from "../client/feathers"
import {setLessonList} from "../actions/lesson"

import {LESSON_API, LESSON_URL} from "../constants/api"

class LessonList extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      search: ""
    }
  }

  componentDidMount = () => {
    Waves.init()
    Waves.attach(".waves")
    if (this.props.lessons) {
      if (typeof this.props.lessons[0] === "undefined") {
        if (this.props.user.hasOwnProperty("_id")) {
          this.search("")
        }
      }
    } else {
      if (this.props.user.hasOwnProperty("_id")) {
        this.search("")
      }
    }

    const lesson = app.service(LESSON_API)
    lesson.on("created", res => {
      const c = this.props.lessons
      c.data = concat(c.data, res)
      this.props.setLessonList(c)
    })
    lesson.on("patched", () => {
      this.search("")
    })
    lesson.on("removed", res => {
      const c = this.props.lessons
      c.data = reject(c.data, res)
      this.props.setLessonList(c)
    })
  }

  componentWillReceiveProps = props => {
    if (props !== this.props) {
      if (props.classId !== this.props.class._id) {
        console.log("LessonList Props Change Detected!", props.classId, this.props.class._id)
        this.search("")
      }
    }
  }

  componentWillUnmount = () => {
    ["created", "removed", "patched"].forEach(e => app.service(LESSON_API).off(e))
  }

  search = (v, classId = this.props.classId) => {
    this.setState({search: v})
    app.service(LESSON_API).find({
      query: {
        $select: ["_id", "url", "name", "description", "thumbnail", "color", "section"],
        name: {
          $regex: v,
          $options: "ig"
        },
        parentCourse: classId
      }
    })
    .then(e => {
      console.info(`[LESSONLIST SEARCH] classId: ${classId}, search: ${v}, result: ${e}`)
      this.props.setLessonList(e)
      Waves.init()
      Waves.attach(".waves")
    })
    .catch(e => {
      swal("Error", e, "error")
    })
  }

  render = () => (
    <div style={this.props.style}>
      <Paper style={{marginTop: this.props.top}}>
        <TextField
          label="ค้นหาบทเรียน" // Lesson Search
          value={this.state.search}
          onChange={v => this.search(v.target.value)}
        />
      </Paper>
      <div>
        {
          this.props.sections ? this.props.sections.map(sect => (
            <Grid key={sect._id} r>
              <Grid xs={12}>
                <Paper>
                  <h2>{sect.name}</h2>
                  <p>{sect.description}</p>
                  {
                    this.props.lessons ? this.props.lessons.map((e, i) => {
                      if (String(e.section) === String(sect._id)) {
                        return (
                          <Grid key={i} r>
                            <Grid xs={12}>
                              <Link to={`${LESSON_URL}${e.url}`} style={{textDecoration: "none"}}>
                                <Paper>
                                  <span>{e.name}</span><br />
                                  <span>{e.description}</span>
                                </Paper>
                              </Link>
                            </Grid>
                          </Grid>
                        )
                      }
                      return null
                    }) : null
                  }
                  <Role is="teacher">
                    <Grid r>
                      <Grid xs={12}>
                        <div onClick={() => this.props.new(sect._id)}>
                          <Paper background="#2d2d30" color="#fefefe">
                            <span>สร้างโน๊ตใหม่</span>
                          </Paper>
                        </div>
                      </Grid>
                    </Grid>
                  </Role>
                </Paper>
              </Grid>
            </Grid>
          )) : null
        }
      </div>
      <GridList
        data={this.props.lessons}
        url={LESSON_URL}
        new={this.props.new}
        cTitle="สร้างโน๊ต"
        c
      />
    </div>
  )

}

const mapStateToProps = state => ({
  lessons: state.lesson.list.data,
  class: state.classes.data,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  setLessonList: data => dispatch(setLessonList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonList)
