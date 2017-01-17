import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../Grid"
import Icon from "../Icon"

import {Filters as Locale} from "../../constants/locales"

import s from "./Searchbar.scss"

export const Search = withStyles(s)(props => (
  <div className={s.searchBar}>
    <input
      data-tip={`คลิกที่นี่เพื่อ${props.label}`}
      placeholder={props.label}
      type="text"
      onChange={props.onChange}
      value={props.value}
    />
    <div className={s.searchIcon}>
      <Icon i="search" />
    </div>
  </div>
))

const Searchbar = props => (
  <div className={s.topbar}>
    <Grid r>
      <Grid xs={12} md={8}>
        <Search
          label={props.searchText}
          onChange={e => props.onSearch(e.target.value, props.filter, props.sort)}
          value={props.search}
        />
      </Grid>
      <Grid className={s.topbarWrap} xs={props.btn ? 6 : 12} md={props.btn ? 2 : 4}>
        <div
          data-tip={`เลือกว่าจะค้นหาข้อมูลจากอะไร`}
          onClick={props.onFilterToggle}
          className={s.filterButton}
        >
          <span>ค้นหาโดย: {Locale[props.filter] || props.filter}</span>
          <Icon i="dropdown" />
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
