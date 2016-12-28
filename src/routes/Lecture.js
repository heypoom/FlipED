import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import FloatingActionButton from "material-ui/FloatingActionButton"
import ModeEdit from "material-ui/svg-icons/editor/mode-edit"

import Content from "../components/Content"
import Shadow from "../components/Shadow"
import Grid from "../components/Grid"
import Role from "../components/Role"
import Navbar from "../components/Navbar"

const h1 = {
  fontWeight: 300
}

const h3 = {
  color: "grey",
  fontWeight: 300
}

const Lecture = ({lessons, params}) => (
  <div>
    <Navbar />
    <div>
      {lessons && (
        <Grid style={{paddingTop: "2em"}} c n>
          <h1 style={h1}>
            {lessons.name}
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
      {lessons && lessons.content.map((e, i) => (
        <Grid key={i} c={!e.full && e.type !== "cover"} n>
          <Shadow
            style={{margin: "1em 0em"}}
            depth={e.type === "card" ? "z-0" : "z-1"}
          >
            <Content {...e} />
          </Shadow>
        </Grid>
      ))}
    </div>
    <Role is="teacher">
      <div style={{position: "fixed", right: "1em", bottom: "1em"}}>
        <Link to={`/notes/${params.id}/edit`}>
          <FloatingActionButton backgroundColor="#2d2d30">
            <ModeEdit />
          </FloatingActionButton>
        </Link>
      </div>
    </Role>
  </div>
)

const mapStateToProps = state => ({
  lessons: state.lessons.data
})

export default connect(mapStateToProps)(Lecture)
