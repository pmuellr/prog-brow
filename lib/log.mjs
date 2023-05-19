import { createRequire } from "module"
const require = createRequire(import.meta.url)

const DEBUG = !!process.env.DEBUG 

const pkg = require('../package.json')

/** @type { (message: string) => void } */
export function log(message) {
  console.log(`${pkg.name}: ${message}`)
}

/** @type { (message: string) => void } */
export function logDebug(message) {
  if (!DEBUG) return
  log(message)
}

/** @type { (message: string) => void } */
export function logExitError(message) {
  log(message)
  process.exit(1)
}

log.debug = logDebug
log.exitError = logExitError
