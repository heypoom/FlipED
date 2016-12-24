import sanitizeHtml from "sanitize-html"
import traverse from "traverse"

const sanitize = text => sanitizeHtml(text, {
  allowedTags: [
    "b", "i", "em", "strong", "a",
    "img", "span", "div", "br"
  ],
  allowedAttributes: {
    a: ["href", "target"],
    span: ["style"],
    div: ["style"]
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
