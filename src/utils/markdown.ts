import HighlightJs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import xss from 'xss'

const MD = new MarkdownIt('commonmark', {
  breaks: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && HighlightJs.getLanguage(lang)) {
      try {
        return HighlightJs.highlight(str, { language: lang }).value
      } catch (__) {}
    }

    return ''
  },
})

export function parse(markdown: string) {
  return MD.parse(markdown, undefined)
}

export function render(markdown: string) {
  return xss(MD.render(markdown, undefined))
}
