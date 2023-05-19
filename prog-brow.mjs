import { getCliParams } from './lib/cli-params.mjs'
import { createRenderers } from './lib/renderers.mjs'

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

async function main() {
  const { pkg, files } = getCliParams()
  const renderers = createRenderers()


  for (const file of files) {
    const result = await renderers.render(file)
    console.log(`file: ${file}`)
    console.log(`${result.html}`)
    console.log(`---`)
    console.log(``)
  }
}