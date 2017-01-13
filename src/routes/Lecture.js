import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import Fab from "material-ui/FloatingActionButton"
import EditIcon from "material-ui/svg-icons/editor/mode-edit"

import Content from "../components/Content"
import Grid from "../components/Grid"
import Role from "../components/Role"
import Navbar from "../components/Navbar"
import Shadow from "../components/Shadow"

const h1 = {
  fontWeight: 300
}

const h3 = {
  color: "grey",
  fontWeight: 300
}

const obj = {
  marginTop: "2em",
  marginBottom: "2em"
}

const Lecture = ({lessons, params}) => (
  <div style={{flex: 1, background: "#fefefe"}}>
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
          {lessons.course && (
            <h3 style={h3}>
              {lessons.course.name}
            </h3>
          )}
        </Grid>
      )}
    </div>
    <div>
      {lessons && lessons.content.map((item, i) => (
        <Grid style={obj} c={!item.full && item.type !== "cover"} key={i} n>
          <Shadow depth={item.type === "card" ? "z-0" : "z-card"}>
            <Content {...item} />
          </Shadow>
        </Grid>
      ))}
    </div>
    <Role is="teacher">
      <div style={{position: "fixed", right: "1em", bottom: "1em"}}>
        <Link to={`/notes/${params.id}/edit`}>
          <Fab>
            <EditIcon />
          </Fab>
        </Link>
      </div>
    </Role>
  </div>
)

const mapStateToProps = state => ({
  lessons: state.lessons.data
})

export default connect(mapStateToProps)(Lecture)
