import React, {Component} from "react"
import {Link} from "react-router"
import {connect} from "react-redux"

import Paper from "./Paper"
import TextField from "./TextField"
import GridList from "./GridList"

import app, {services} from "../client/api"
import {LESSON, LESSON_URL} from "../constants/api"
import {setField} from "../actions/app"

const mapStateToProps = state => ({
  lessons: state.lessons.queryResult,
  searchField: state.app.fields.searchLesson,
  user: state.user
})

const mapDispatchToProps = (dispatch, props) => ({
  search: (query = "") => {
    dispatch(setField("searchLesson", query))
    dispatch(services.lessons.find({
      query: {
        $select: ["_id", "url", "name", "description", "thumbnail", "color", "section"],
        name: {
          $regex: query,
          $options: "ig"
        },
        course: props.classId
      }
    }))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class LessonList extends Component {

  componentDidMount = () => {
    /*
    app.service(LESSON).on("created", () => this.props.search())
    app.service(LESSON).on("patched", () => this.props.search())
    app.service(LESSON).on("removed", () => this.props.search())
    */
  }

  componentWillUnmount = () => {
    // ["created", "removed", "patched"].forEach(e => app.service(LESSON).off(e))
  }

  render = () => (
    <div>
      <Paper>
        <TextField
          label="ค้นหาบทเรียน"
          value={this.props.searchField}
          onChange={v => this.props.search(v.target.value)}
        />
      </Paper>
      <GridList
        data={this.props.lessons && this.props.lessons.data}
        url={LESSON_URL}
        cLink="/create"
        cTitle="สร้างห้องเรียน"
      />
    </div>
  )

}
