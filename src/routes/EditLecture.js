import React, {Component} from "react"
import {connect} from "react-redux"
import {push} from "connected-react-router"

import FloatingActionButton from "material-ui/FloatingActionButton"
import CloseIcon from "material-ui/svg-icons/navigation/close"

import ContentEditor from "../components/ContentEditor"
import Shadow from "../components/Shadow"
import Grid from "../components/Grid"
import Role from "../components/Role"

import {setEditor, loadEditor} from "../actions/editor"
import {services} from "../client/api"

const h1 = {
  fontWeight: 300
}

const h3 = {
  color: "grey",
  fontWeight: 300
}

// TODO: Fix component not rerendering

const mapStateToProps = state => ({
  lessons: state.lessons.data,
  editor: state.editor
})

const mapDispatchToProps = (dispatch, props) => ({
  set: (index, key, value) => dispatch(setEditor(props.params.id, index, key, value)),
  load: data => dispatch(loadEditor(props.params.id, data)),
  save: data => {
    console.log(`LESSONS::PATCH ${props.params.id}`, {content: data})
    dispatch(services.lessons.patch(props.params.id, {content: data}))
    dispatch(push(`/notes/${props.params.id}`))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class EditLecture extends Component {

  constructor(props) {
    super(props)
    if (props.lessons)
      props.load(props.lessons.content)
  }

  save = () => this.props.save(this.props.editor[this.props.params.id])

  render = () => {
    const editor = this.props.editor[this.props.params.id]
    const lessons = this.props.lessons
    return (
      <div>
        <div>
          {lessons && (
            <Grid style={{paddingTop: "2em"}} c n>
              <h1 style={h1}>
                {lessons.name} [Edit]
              </h1>
              <h3 style={{...h3, lineHeight: "1.3em"}}>
                {lessons.description}
              </h3>
              <h3 style={h3}>
                {lessons.parentCourse.name}
              </h3>
            </Grid>
          )}
        </div>
        <div>
          {editor && editor.map((e, i) => (
            <Grid key={i} c={!e.full && e.type !== "cover"} n>
              <Shadow
                style={{margin: "1em 0em"}}
                depth={e.type === "card" ? "z-0" : "z-1"}
              >
                <ContentEditor set={(k, v) => this.props.set(i, k, v)} {...e} />
              </Shadow>
            </Grid>
          ))}
        </div>
        <Role is="teacher">
          <div style={{position: "fixed", right: "1em", bottom: "1em"}}>
            <FloatingActionButton onClick={this.save} backgroundColor="#2d2d30">
              <CloseIcon />
            </FloatingActionButton>
          </div>
        </Role>
      </div>
    )
  }

}
