import React, {Component} from "react"
import KeyHandler from "react-key-handler"
import {Link} from "react-router"
import {connect} from "redux-await"

import app from "../client/feathers"

import Toolbar from "../components/Toolbar"
import Fab from "../components/Fab"
import Fa from "../components/Fa"
import Role from "../components/Role"
import Content from "../components/Content"
import Cover from "../components/Cover"
import Comment from "../components/Comment"
import Grid from "../components/Grid"
import Paper from "../components/Paper"
import ChapterStepper from "../components/ChapterStepper"

import {LESSON_API, LESSON_URL} from "../constants/api"
import {setLesson} from "../actions/lesson"

/*
  NOTE: Non-useful analytics had been disabled for the time being.
  app.service(TRACK_API).create({
    action: "LESSON_OPEN",
    userId: app.get("user"),
    payload: {
      lessonId: result.data[0]._id
    }
  })
*/

class Lesson extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      sections: props.lesson.content.filter(e => e.type === "cover"),
      section: 1,
    }
  }

  componentDidMount = () => {
    this.loadContent(this.props.params.id)
    app.service(LESSON_API).on("patched", data => {
      if (data._id === this.props.lesson._id)
        this.props.setLesson(data)
    })
  }

  componentWillReceiveProps = props => {
    if (props.lesson.url !== props.params.id) {
      console.log(`Old: ${props.lesson.url}, New: ${props.params.id}`)
      this.loadContent(props.params.id)
    }
  }

  componentWillUnmount = () => app.service(LESSON_API).off("patched")

  loadContent = url => {
    app.service(LESSON_API).find({query: {url: url}}).then(result => {
      if (result.total > 0) {
        if (result.data[0].hasOwnProperty("_id")) {
          this.props.setLesson(result.data[0])
          this.setState({sections: result.data[0].content.filter(e => e.type === "cover")})
        }
      }
    })
  }

  displaySection = (section, content) => {
    const s = {index: 0, start: 0, end: 0}
    content.forEach((item, i) => {
      if (item.type === "cover") {
        s.index++
        if (s.index === section) {
          s.start = i
        } else if (s.index === section + 1) {
          s.end = i
        }
      } else if ((s.end === 0) && (i + 1 === content.length)) {
        s.end = i
      }
    })
    const result = s.start === s.end ? content[s.end] : content.slice(s.start, s.end)
    console.log(result)
    return s.index === 0 ? content : result
  }

  render = () => (
    <div>
      <Toolbar title={this.props.lesson.name} fixed hideTitle />
      <div style={this.props.style}>
        <Grid style={{paddingTop: "4em"}}>
          <Cover
            src={this.props.lesson.thumbnail}
            heading={this.props.lesson.name}
            subheading={this.props.lesson.description}
            alpha="0.3"
            size="cover"
            position="50% 75%"
            height="20em"
            textAlign="left"
            left="10%"
          />
        </Grid>
        <Grid c>
          <Grid r>
            <Grid xs="12" sm="12" md="3">
              <Paper>
                <h2 style={{margin: 0}}>หัวข้อหลัก</h2>
                <ChapterStepper
                  data={this.state.sections}
                  set={v => this.setState({section: v})}
                  choosen={this.state.section}
                />
              </Paper>
            </Grid>
            <Grid xs="12" sm="12" md="9">
              <article>
                {
                  this.displaySection(this.state.section, this.props.lesson.content).map((e, i) => (
                    <div key={i}>
                      <Content data={e} index={i} />
                    </div>
                  ))
                }
              </article>
              <Comment for={this.props.lesson._id} />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Role is="teacher">
        <Link to={`${LESSON_URL}${this.props.params.id}/edit`}>
          <Fab><Fa i="pencil" /></Fab>
        </Link>
      </Role>
      <KeyHandler
        keyEventName="keydown"
        keyValue="ArrowLeft"
        onKeyHandle={() => this.setState({section: this.state.section - 1})}
      />
      <KeyHandler
        keyEventName="keydown"
        keyValue="ArrowRight"
        onKeyHandle={() => this.setState({section: this.state.section + 1})}
      />
    </div>
  )

}

const mapStateToProps = state => ({
  lesson: state.lesson.data
})

const mapDispatchToProps = dispatch => ({
  setLesson: data => dispatch(setLesson(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)
