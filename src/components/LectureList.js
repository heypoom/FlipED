import React from "react"
import {connect} from "react-redux"
import {reduxForm, Field, reset} from "redux-form"
import {Link} from "react-router"

import Grid from "./Grid"
import Role from "./Role"
import FancyCard from "./FancyCard"
import SimpleForm, {ImageUpload} from "./SimpleForm"
import {Search} from "./Searchbar"

import {services} from "../client/api"
import {search} from "../actions/search"
import {INITIAL_CONTENT} from "../constants/content"

export const LectureCreator = reduxForm({form: "lecture"})(props => (
  <SimpleForm type="บทเรียน" onSubmit={props.handleSubmit}>
    <Field
      data-tip="ใส่ชื่อบทเรียนที่คุณจะสอน"
      component="input"
      type="text"
      name="name"
      placeholder="ชื่อบทเรียน"
      required
    />
    <Field
      data-tip="อธิบายโดยย่อว่าคุณจะสอนเกี่ยวกับอะไร"
      component="input"
      type="text"
      name="description"
      placeholder="คำอธิบายบทเรียน"
      required
    />
    <Field
      component={ImageUpload}
      name="thumbnail"
      required
    />
  </SimpleForm>
))

const link = {
  textDecoration: "none",
  color: "#222"
}

const bottom = {
  marginBottom: "2em"
}

const LinkHOC = props => (
  <Link style={link} to={`/notes/${props.id}`} onClick={props.onClick}>
    {props.children}
  </Link>
)

const LectureList = props => (
  <Grid r>
    <Role is="teacher">
      <Grid xs={12} sm={6} md={5} lg={4}>
        <LectureCreator onSubmit={props.create} />
      </Grid>
    </Role>
    <Grid xs={12} sm={6} a="md">
      <Grid style={{marginBottom: "1em"}} r>
        <Grid xs={12}>
          <Search
            label="ค้นหาบทเรียนที่คุณสนใจ"
            value={props.search}
            onChange={props.handleSearch}
          />
        </Grid>
      </Grid>
      <Grid r>
        {props.lessons && props.lessons.data.map((item, i) => (
          <Grid xs={12} sm={6} md={4} style={bottom} key={i}>
            <FancyCard
              delete={() => props.remove(item._id)}
              deleteTip="ลบเนื้อหา"
              enter={() => props.enter(item._id)}
              wrapper={LinkHOC}
              {...item}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
)

const mapStateToProps = state => ({
  user: state.user || {},
  lessons: state.lessons.queryResult,
  search: state.search.lessons.value
})

const mapDispatchToProps = (dispatch, props) => ({
  remove: id => dispatch(services.lessons.remove(id)),
  enter: id => dispatch(services.lessons.get(id)),
  handleSearch: e => dispatch(search(e.target.value, "lessons", {
    course: props.classId
  })),
  create: data => {
    reset("lecture")
    dispatch(services.lessons.create({
      ...data,
      content: INITIAL_CONTENT,
      course: props.classId
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LectureList)
