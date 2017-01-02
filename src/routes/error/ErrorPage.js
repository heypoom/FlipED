import React, {PropTypes} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./ErrorPage.scss"

const ERROR = "Error"
const ERROR_P = "Sorry, a critical error occurred on this page."
const NOT_FOUND = "Page Not Found"
const NOT_FOUND_P = "Sorry, the page you were trying to view does not exist."

export const ErrorPage = ({error}, context) => {
  if (context.setTitle)
    context.setTitle(NOT_FOUND)

  return (
    <div>
      <h1>{error.status === 404 ? NOT_FOUND : ERROR}</h1>
      <p>{error.status === 404 ? NOT_FOUND_P : ERROR_P}</p>
      {process.env.NODE_ENV === "development" && (
        <pre>{error.stack}</pre>
      )}
    </div>
  )
}

ErrorPage.propTypes = {error: PropTypes.object.isRequired}
ErrorPage.contextTypes = {setTitle: PropTypes.func.isRequired}

export default withStyles(s)(ErrorPage)
