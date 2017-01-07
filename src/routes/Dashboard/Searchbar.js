import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../../components/Grid"
import Icon from "./Icon"

import s from "./Searchbar.scss"

const Searchbar = props => (
  <div className={s.topbar}>
    <Grid r>
      <Grid xs={12} md={8}>
        <div className={s.searchBar}>
          <input
            placeholder="Search by Name, Roles and Courses."
            type="text"
            onChange={e => props.onSearch(e.target.value, props.filter)}
            value={props.search}
          />
          <div className={s.searchIcon}>
            <Icon i="search" />
          </div>
        </div>
      </Grid>
      <Grid className={s.topbarWrap} xs={props.btn ? 6 : 12} md={props.btn ? 2 : 4}>
        <div onClick={props.onFilterToggle} className={s.filterButton}>
          Filter by: {props.filter}
        </div>
      </Grid>
      <Grid className={s.topbarWrap} xs={6} md={2}>
        <div onClick={props.btn} className={s.topbarButton}>
          {props.btnText}
        </div>
      </Grid>
    </Grid>
    <hr />
  </div>
)

export default withStyles(s)(Searchbar)
