/** @typedef { import('../types.ts').RenderFn } RenderFn */
/** @typedef { import('../types.ts').ConfigFn } ConfigFn */

/** @type { ConfigFn } */
export function config(options) {
  return {
    name: 'text',
    version: '0.0.1',
    matching: {
      paths: ['**/*'],
    }
  }
}

/** @type { RenderFn } */
export async function render(options) {
  const { contents, path, type } = options

  return {
    html: `<pre>${contents.toString('utf8')}</pre>`,
  }
}
