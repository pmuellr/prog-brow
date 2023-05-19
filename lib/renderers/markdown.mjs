/** @typedef { import('../types.ts').RenderFn } RenderFn */
/** @typedef { import('../types.ts').ConfigFn } ConfigFn */

import markdown from 'markdown-it'
import markdownItPrism from 'markdown-it-prism'

/** @type { ConfigFn } */
export function config(options) {
  return {
    name: 'markdown',
    version: '0.0.1',
    matching: {
      paths: ['**/*.md'],
    }
  }
}

const MarkdownOptions = {
  html: true,
  linkify: true,
}

const md = markdown(MarkdownOptions)
// @ts-ignore
md.use(markdownItPrism)

/** @type { RenderFn } */
export async function render(options) {
  const { contents, path, type } = options

  const mdContent = contents.toString('utf8')
  const html = md.render(mdContent)

  return { html }
}
