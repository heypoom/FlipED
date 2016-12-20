import React from "react"
import {Link} from "react-router"
import {connect} from "react-redux"

import {services} from "../constants/api"

import Toolbar from "../components/Toolbar"
import Fab from "../components/Fab"
import Icon from "../components/Icon"
import Role from "../components/Role"
import Content from "../components/Content"
import Cover from "../components/Cover"
import Comment from "../components/Comment"
import Grid from "../components/Grid"
import Paper from "../components/Paper"
import ChapterStepper from "../components/ChapterStepper"

const Lesson = props => (
  <div>
    <Toolbar title={props.lesson.name} fixed hideTitle />
    <div style={props.style}>
      <Grid style={{paddingTop: "4em"}}>
        <Cover
          src={props.lesson.thumbnail}
          heading={props.lesson.name}
          subheading={props.lesson.description}
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
              <h2 style={{margin: 0}}>{props.class.name}</h2>
              {
                (props.class.sections) ? (
                  <ChapterStepper
                    data={props.class.sections}
                    lesson={props.lesson}
                    lessons={props.lessons}
                    uriPrefix={LESSON_URL}
                    prev={x => this.setState({_prev: x})}
                    next={x => this.setState({_next: x})}
                  />
                ) : <div>No Sections: {props.class._id}</div>
              }
            </Paper>
          </Grid>
          <Grid xs={12} sm={12} md={9}>
            <article>
              {
                props.lesson.content.map((e, i) => (
                  <div key={i}>
                    <Content data={e} index={i} />
                  </div>
                ))
              }
            </article>
            <Comment for={props.lesson._id} />
          </Grid>
        </Grid>
      </Grid>
    </div>
    <Role is="teacher">
      <Link to={`${LESSON_URL}${props.params.id}/edit`}>
        <Fab><Icon i="pencil" /></Fab>
      </Link>
    </Role>
  </div>
)

const mapStateToProps = state => ({
  lesson: state.lesson.queryResult,
  class: state.classes.data
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)
