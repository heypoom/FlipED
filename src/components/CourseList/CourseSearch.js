import React from "react"
import {connect} from "react-redux"

import Searchbar from "../Searchbar"

import {search, filter} from "../../actions/search"

const CourseSearch = props => (
  <Searchbar
    searchText="ค้นหาคอร์สที่ท่านสนใจ"
    onSearch={value => props.handleSearch(value, props.user)}
    value={props.search}
    onFilterToggle={() => props.toggleFilter(props.filter, props.user)}
    filter={props.filter}
    sort={props.sort}
    hr={props.hr}
    top={props.top}
  />
)

const mapStateToProps = state => ({
  user: state.user,
  search: state.search.classes.value || "",
  filter: state.search.classes.filter || "name",
  sort: state.search.classes.sort || false
})

const mapDispatchToProps = dispatch => ({
  handleSearch: (value, user) => dispatch(search(value, "classes", {
    $or: [
      {owner: {$in: [user._id]}},
      {students: {$in: [user._id]}},
    ]
  })),
  toggleFilter: (ev, user) => {
    dispatch(filter(ev === "name" ? "description" : "name", "classes", {
      $or: [
        {owner: {$in: [user._id]}},
        {students: {$in: [user._id]}},
      ]
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseSearch)
