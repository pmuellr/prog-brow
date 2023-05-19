#!/usr/bin/env node

import { getCliParams } from './lib/cli-params.mjs'
import { createRenderers } from './lib/renderers.mjs'

cli()

export async function cli() {
  const { files } = getCliParams(import.meta)
  const renderers = createRenderers()

  for (const file of files) {
    const result = await renderers.render(file)
    console.log(`file: ${file}`)
    console.log(`${result.html}`)
    console.log(`---`)
    console.log(``)
  }

  process.exit()
}
