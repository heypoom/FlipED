import TextIcon from "material-ui/svg-icons/content/text-format"
import PhotoIcon from "material-ui/svg-icons/image/add-a-photo"
import CoverIcon from "material-ui/svg-icons/image/gradient"
import VideoIcon from "material-ui/svg-icons/notification/ondemand-video"
import QuizIcon from "material-ui/svg-icons/action/note-add"
import EmbedIcon from "material-ui/svg-icons/content/create"

export const INITIAL_CONTENT = [{
  type: "card",
  content: "ยินดีต้อนรับครับ"
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