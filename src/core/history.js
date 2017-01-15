import {createBrowserHistory, createMemoryHistory} from "history"

const history = process.env.BROWSER ? createBrowserHistory : createMemoryHistory

export default history()
