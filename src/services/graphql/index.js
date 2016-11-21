import {apolloServer} from "apollo-server"

import Resolvers from "./resolvers"
import Schema from "./schema"

import {GRAPHQL_API} from "../../constants/api"

export default function graphql() {
  const app = this
  const ApolloService = apolloServer(req => {
    const {token, provider} = req.feathers
    return {
      graphiql: true,
      pretty: true,
      schema: Schema,
      resolvers: Resolvers.call(app),
      context: {
        token,
        provider
      }
    }
  })

  app.use(GRAPHQL_API, ApolloService)
}
