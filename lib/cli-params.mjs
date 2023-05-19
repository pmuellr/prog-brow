/** @typedef { import('./types.ts').CliParams } CliParams */
/** @typedef { import('meow').AnyFlags } AnyFlags */
/** @typedef { import('meow').Options<AnyFlags> } Options */

import meow from 'meow'

import { log } from './log.mjs'

/** @type { Options } */
const meowOptions = {
  importMeta: import.meta,
  flags: {
    help:    { type: 'boolean', shortFlag: 'h' },
    version: { type: 'boolean', shortFlag: 'v' },
    port:    { type: 'number',  shortFlag: 'p' },
  }
}

/** @type { () => CliParams } */
export function getCliParams() {
  const { input, flags, pkg } = meow(meowOptions)
  log.debug(`meow input: ${JSON.stringify(input)}`)
  log.debug(`meow flags: ${JSON.stringify(flags)}`)

  /** @type { number | undefined } */
  let port
  if (flags.port) {
    port = Number(flags.port)
    if (Number.isNaN(port)) {
      log(`invalid port number: ${flags.port}`)
      process.exit(1)
    }
  }

  if (input.length === 0) printHelp(pkg)
  if (flags.help) printHelp(pkg)
  if (flags.version) printVersion(pkg)

  return {
    port,
    pkg,
    files: input,
  }
}

/** @type { (pkg: Record<string, unknown>) => void } */
function printVersion(pkg) {
  console.log(pkg.version)
  process.exit(1)
}

/** @type { (pkg: Record<string, unknown>) => void } */
function printHelp(pkg) {
  console.log(`
${pkg.name} v${pkg.version}

usage:
    ${pkg.name} [options] file file file ...

options:
    -p --port          http port
    -h --help          print this help
    -v --version       print program version

The DEBUG environment variable can be set to anything for debug logging.

For more information, go to ${pkg.homepage}
`.trim())
  process.exit(1)
}

