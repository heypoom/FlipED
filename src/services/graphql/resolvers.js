import verifyPassword from "./lib/auth"

import {POST_API, USER_API, COMMENT_API, VIEWER_API} from "../../constants/api"

export default function Resolvers() {
  const app = this

  const Posts = app.service(POST_API)
  const Users = app.service(USER_API)
  const Comments = app.service(COMMENT_API)
  const Viewer = app.service(VIEWER_API)

  // const ClientKey = TOKEN_KEY

  return {
    User: {
      posts(user) {
        return Posts.find({
          query: {
            authorId: user._id
          }
        })
      }
    },
    Post: {
      comments(post) {
        return Comments.find({
          query: {
            postId: post._id
          }
        })
      },
      author(post) {
        return Users.get(post.authorId)
      }
    },
    Comment: {
      author(comment) {
        return Users.get(comment.authorId)
      }
    },
    AuthPayload: {
      data(auth) {
        return auth.data
      }
    },
    RootQuery: {
      viewer(root, args, context) {
        return Viewer.find(context)
      },
      author(root, {username}) {
        return Users.find({
          query: {
            username
          }
        }).then(users => users[0])
      },
      authors() {
        return Users.find({})
      },
      posts(root, {category}) {
        return Posts.find({
          query: {
            category
          }
        })
      },
      post(root, {_id}) {
        return Posts.get(_id)
      }
    },

    RootMutation: {
      signUp(root, args) {
        return Users.create(args)
      },
      logIn(root, {username, password}) {
        return verifyPassword(app, username, password)
      },
      createPost(root, args, context) {
        return Users.create(args, context)
      },
      createComment(root, args, context) {
        return Comments.create(args, context)
      },
      removePost(root, {_id}, context) {
        return Posts.remove(_id, context)
      },
      removeComment(root, {_id}, context) {
        return Comments.remove(_id, context)
      }
    }
  }
}
