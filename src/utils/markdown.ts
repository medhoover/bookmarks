import MarkdownIt from 'markdown-it'
import xss from 'xss'

const MD = new MarkdownIt()

export function parse(markdown: string) {
  return MD.parse(markdown, undefined)
}

export function render(markdown: string) {
  return xss(MD.render(markdown, undefined))
}
