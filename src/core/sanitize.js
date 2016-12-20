import sanitizeHtml from "sanitize-html"
import traverse from "traverse"

export default (text, options = {imgStyle: ""}) => sanitizeHtml(text, {
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
})

export const escapeJSON = (json, options) => traverse(json).forEach(function sanitizer(node) {
  if (typeof node === "string")
    this.update(sanitize(node, options))
})
