import fsBlob from "fs-blob-store"
import path from "path"
import multer from "multer"
import dauria from "dauria"
import blobService from "feathers-blob"

const m = multer()
const blobStorage = fsBlob(path.join(__dirname, "/public/uploads"))

export default function upload() {
  /* eslint no-param-reassign: 0 */
  this.use("api/upload",
    m.single("uri"),
    (req, res, next) => {
      req.feathers.file = req.file
      next()
    },
    blobService({Model: blobStorage})
  )
  this.service("api/upload").before({
    create: [
      hook => {
        if (!hook.data.uri && hook.params.file) {
          const file = hook.params.file
          hook.data = {uri: dauria.getBase64DataURI(file.buffer, file.mimetype)}
        }
        if (!hook.data.uri && hook.data.file) {
          hook.data = {uri: dauria.getBase64DataURI(file.buffer, file.mimetype)}
        }
      }
    ]
  })
}
