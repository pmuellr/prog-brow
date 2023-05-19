import { fastify } from 'fastify'
import { log } from './log.mjs'
import { createRenderers } from './renderers.mjs' 

const renderers = createRenderers()
const server = fastify({ logger: true })

server.get('/hallo', async (request, reply) => {
  return { hello: 'world' }
})

server.get('/render/*', async (request, reply) => {
  const path = `/${request.params['*']}`
  log(`rendering ${path}`)
  const result = await renderers.render(path)
  reply.type('text/html')
  reply.status(200)
  reply.send(result.html)
})

/** @type { () => Promise<number> } */
export async function start() {
  try {
    await server.listen()
    const addresses = server.addresses()
    const port = addresses[0].port
    return port
  } catch (err) {
    log.exitError(`error creating server: ${err}`)
  }
}
