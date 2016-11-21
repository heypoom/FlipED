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

import {LESSON_API, LESSON_URL, CLASS_API} from "../constants/api"
import {setLesson} from "../actions/lesson"
import {setClass} from "../actions/classes"

class Lesson extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      _prev: "",
      _next: ""
    }
    console.log(props.class)
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
          if (result.data[0].hasOwnProperty("parentCourse")) {
            this.retrieveSections(result.data[0].parentCourse)
          }
        }
      }
    })
  }

  prev = () => this.context.router.transitionTo(this.state._prev)

  next = () => this.context.router.transitionTo(this.state._next)

  retrieveSections = parentCourse => {
    app.service(CLASS_API).find({
      query: {
        _id: parentCourse
      }
    }).then(e => this.props.setClass(e.data[0]))
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
            <Grid xs={12} sm={12} md={3}>
              <Paper>
                <h2 style={{margin: 0}}>{this.props.class.name}</h2>
                {
                  (this.props.class.sections) ? (
                    <ChapterStepper
                      data={this.props.class.sections}
                      lesson={this.props.lesson}
                      lessons={this.props.lessons}
                      uriPrefix={LESSON_URL}
                      prev={x => this.setState({_prev: x})}
                      next={x => this.setState({_next: x})}
                    />
                  ) : <div>No Sections: {this.props.class._id}</div>
                }
              </Paper>
            </Grid>
            <Grid xs={12} sm={12} md={9}>
              <article>
                {
                  this.props.lesson.content.map((e, i) => (
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
        onKeyHandle={this.prev}
      />
      <KeyHandler
        keyEventName="keydown"
        keyValue="ArrowRight"
        onKeyHandle={this.next}
      />
    </div>
  )

}

const mapStateToProps = state => ({
  lesson: state.lesson.data,
  lessons: state.lesson.list.data,
  class: state.classes.data
})

const mapDispatchToProps = dispatch => ({
  setLesson: data => dispatch(setLesson(data)),
  setClass: data => dispatch(setClass(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)
