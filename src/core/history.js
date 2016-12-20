import {createBrowserHistory, createMemoryHistory} from "history"

export default (process.env.BROWSER ? createBrowserHistory : createMemoryHistory)()
