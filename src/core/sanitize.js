import sanitizeHtml from "sanitize-html"
import traverse from "traverse"

const DEFAULT_STYLE = {
  imgStyle: ""
}

export default function sanitize(text, options = DEFAULT_STYLE) {
  const sanitizeConfig = {
    allowedTags: [
      "b", "i", "em", "strong", "a",
      "img", "span", "div", "br"
    ],
    allowedAttributes: {
      a: ["href", "target"],
      img: ["src", "class", "style"],
      span: ["style"],
      div: ["style"]
    },
    transformTags: {
      img: (tagName, attribs) => ({
        tagName: tagName,
        attribs: {
          src: attribs.src || "",
          class: attribs.class || "",
          style: `max-width: 100%; height: auto; display: block;`
          + ` ${options.imgStyle} ${attribs.style || ""}`
        }
      }),
      a: (tagName, attribs) => ({
        tagName: tagName,
        attribs: {
          href: attribs.href || "#!",
          target: "_blank"
        }
      })
    }
  }
  return sanitizeHtml(text, sanitizeConfig)
}

export function escapeJSON(json, options) {
  const output = traverse(json).map(function(e) {
    if (typeof e === "string")
      this.update(sanitize(e, options))
  })
  return output
}
