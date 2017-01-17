import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../Icon"
import Role from "../Role"
import Grid from "../Grid"

import {LOGO} from "../../constants/visual"
import {roleMap, Path, Locale, Icons} from "../../constants/routes"

import {setUi} from "../../actions/app"

import s from "./Sidebar.scss"

const SideLink = withStyles(s)(({route, onClick, href, isActive}) => (
  <a href={href} onClick={onClick} className={s.sideLink}>
    <div
      className={c(s.sidebarItem, isActive && s.active)}
      data-tip={`ไปยังส่วน${Locale[route]}`}
    >
      <Icon i={Icons[route]} />
      <div>{Locale[route] || route}</div>
    </div>
  </a>
))

/*
  import Paper from "material-ui/Paper"
  import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation"

  import IconLocationOn from "material-ui/svg-icons/communication/location-on"

  <div className={s.bottomMobile}>
    <Paper zDepth={1}>
      <BottomNavigation selectedIndex={0}>
        {Object.keys(roleMap).map((route, i) => (
          <Role key={i}>
            <BottomNavigationItem
              label={Locale[route] || route}
              icon={<IconLocationOn />}
            />
          </Role>
        ))}
      </BottomNavigation>
    </Paper>
  </div>
*/

const Sidebar = props => (
  <div className={s.sidebarWrapper}>
    <div className={c(s.sidebarMobile, props.show && s.show)}>
      <div className={s.sidebarContainer}>
        <Grid r>
          {Object.keys(roleMap).map((route, i) => (
            <Role {...roleMap[route]} key={i}>
              <Grid style={{textAlign: "center"}} onClick={props.off} xs={4}>
                <Link activeOnlyWhenExact to={Path[route] || "#!"}>
                  {params => <SideLink route={route} {...params} />}
                </Link>
              </Grid>
            </Role>
          ))}
        </Grid>
      </div>
    </div>
    <div className={s.sidebar}>
      <div className={s.sidebarContainer}>
        {Object.keys(roleMap).map((route, i) => (
          <Role {...roleMap[route]} key={i}>
            <Link activeOnlyWhenExact to={Path[route] || "#!"}>
              {params => <SideLink route={route} {...params} />}
            </Link>
          </Role>
        ))}
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  show: state.app.ui.mobileMenu || false
})

const mapDispatchToProps = dispatch => ({
  off: () => dispatch(setUi("mobileMenu", false))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Sidebar))
