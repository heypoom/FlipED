import TextIcon from "material-ui/svg-icons/content/text-format"
import PhotoIcon from "material-ui/svg-icons/image/add-a-photo"
import CoverIcon from "material-ui/svg-icons/action/aspect-ratio"
import VideoIcon from "material-ui/svg-icons/notification/ondemand-video"
import EmbedIcon from "material-ui/svg-icons/action/code"
import QuizIcon from "material-ui/svg-icons/action/lightbulb-outline"

export const INITIAL_CONTENT = [{
  type: "card",
  content: ""
}]

export const subjects = [{
  value: "compsci",
  label: "วิทยาการคอมพิวเตอร์"
}, {
  value: "maths",
  label: "คณิตศาสตร์"
}, {
  value: "science",
  label: "วิทยาศาสตร์"
}, {
  value: "language",
  label: "ภาษาต่างประเทศ"
}]

export default {
  default: [{
    name: "ข้อความ",
    id: "card",
    icon: TextIcon
  }, {
    name: "รูปภาพ",
    id: "image",
    icon: PhotoIcon
  }, {
    name: "Cover",
    id: "cover",
    icon: CoverIcon
  }, {
    name: "วิดิโอ YouTube",
    id: "youtube",
    icon: VideoIcon
  }, {
    name: "คำถามสี่ตัวเลือก",
    id: "quiz",
    icon: QuizIcon
  }, {
    name: "ฝัง (Embed)",
    id: "embed",
    icon: EmbedIcon
  }],
  maths: [{
    name: "กราฟ",
    id: "grapher"
  }, {
    name: "สมการ",
    id: "maths_expr"
  }],
  compsci: [{
    name: "Code Blocks",
    id: "code"
  }, {
    name: "GitHub Gist",
    id: "gist"
  }, {
    name: "Interactive Code Editor",
    id: "csice"
  }],
  science: [{
    name: "Lab Notes",
    id: "labnote"
  }],
  language: [{
    name: "Memrise",
    id: "memrise"
  }]
}
