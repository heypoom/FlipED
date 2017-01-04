import sanitizeHtml from "sanitize-html"
import traverse from "traverse"

const sanitize = text => sanitizeHtml(text, {
  allowedTags: [
    "b", "i", "em", "strong", "a", "blockquote", "center",
    "img", "span", "div", "br", "p", "ol", "li"
  ],
  allowedAttributes: {
    a: ["href", "target"],
    span: ["style"],
    strong: ["style"]
  },
  transformTags: {
    a: (tagName, attribs) => ({
      tagName: tagName,
      attribs: {
        href: attribs.href || "#!",
        target: "_blank"
      }
    })
  }
})

export const escapeJSON = json => traverse(json).forEach(function sanitizer(node) {
  if (typeof node === "string")
    this.update(sanitize(node))
})

export default sanitize
