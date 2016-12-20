import React, {Component, PropTypes} from "react"
import {Provider} from "react-redux"
import {app, USER_API} from "../../constants/api"

const emptyFunction = () => {}

import {setUserInfo} from "../../actions/user"

import s from "./App.scss"

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object.isRequired,
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  }

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  }

  getChildContext() {
    const context = this.props.context
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    }
  }

  componentWillMount() {
    const {insertCss, store} = this.props.context
    this.removeCss = insertCss(s)
    app.service(USER_API).on("patched", e => {
      if (store.getState().user._id === e._id) {
        store.dispatch(setUserInfo(e))
      }
    })
  }

  componentWillUnmount() {
    this.removeCss()
    app.service(USER_API).off("patched")
  }

  render() {
    if (this.props.error)
      return this.props.children

    return (
      <Provider store={this.props.context.store}>
        {this.props.children}
      </Provider>
    )
  }

}

export default App
