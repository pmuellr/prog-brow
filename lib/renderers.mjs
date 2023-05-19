/** @typedef { import('./types.ts').Renderer } Renderer */
/** @typedef { import('./types.ts').RenderFn } RenderFn */
/** @typedef { import('./types.ts').RenderConfig } RenderConfig */
/** @typedef { import('./types.ts').RenderResult } RenderResult */

import { readFile } from 'node:fs/promises';

import { minimatch } from 'minimatch'

import { log } from './log.mjs'
import { BuiltInRenderers } from './renderers/index.mjs'

export function createRenderers() {
  return new Renderers()
}

class Renderers {
  constructor() {
    /** @type { Map<string, Renderer> } */
    this._renderers = new Map()
    for (const { config: getConfig, render } of BuiltInRenderers) {
      const config = getConfig({})
      this.addRenderer(config, render)
    }
  }

  /** @type { (config: RenderConfig, render: RenderFn) => void } */
  addRenderer(config, render) {
    this._renderers.set(config.name, { config, render })
  }

  /** @type { (path: string) => Promise<RenderResult> } */
  async render(path) {
    const rendererName = findBestRenderer(path, [...this._renderers.values()])
    if (rendererName == '') { throw new Error(`No renderer found for ${path}`) }

    const renderer = this._renderers.get(rendererName)
    if (!renderer) { throw new Error(`Renderer ${rendererName} not found`) }

    /** @type { Buffer } */
    let contents
    try {
      contents = await readFile(path)
    } catch (err) {
      const message = `Error reading "${path}": ${err.message}`
      log(message)
      return { html: `<pre>${message}</pre>` }
    }

    try {
      return await renderer.render({ path, contents })
    } catch (err) {
      const message = `Error running renderer ${rendererName} on "${path}": ${err.message}`
      log(message)
      return { html: `<pre>${message}</pre>` }
    }
  }
}

/** @type { (path: string, renderers: Renderer[]) => string } */
function findBestRenderer(path, renderers) {

  /** @type { { name: string, match: string } [] } */
  const matches = []

  for (const renderer of renderers) {
    for (const match of renderer.config.matching.paths) {
      if (minimatch(path, match)) {
        matches.push({ name: renderer.config.name, match })
      }
    }
  }

  matches.sort((a, b) => b.match.length - a.match.length)
  log.debug(`findBestRenderer(${path}); matches: ${JSON.stringify(matches)})`)

  return matches[0]?.name || ''
}