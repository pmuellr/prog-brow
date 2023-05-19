#!/usr/bin/env node

const { app, BrowserWindow } = require('electron')

const FixedPath = '/Users/pmuellr/Projects/pmuellr/prog-brow/prog-brow.js'

main()

async function main() {
  const { start: serverStart } = await import('./lib/server.mjs')
  const { log } = await import('./lib/log.mjs')

  const port = await serverStart()

  app.on('open-file', (event, path) => { 
    log(`open-file: ${path}`)
    event.preventDefault()
    openFile(port, path) 
  })

  app.on('window-all-closed', () => {
    app.quit()
  })

  await app.whenReady()
  appReady(port)
}

/** @type { (port: number, path: string) => void } */
function openFile(port, path) {
  createWindow(port, path)
}

/** @type { (port: number) => void } */
function appReady(port) {
  createWindow(port, FixedPath)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(port, FixedPath)
    }
  })
}

/** @type { (port: number, path: string) => BrowserWindow } */
function createWindow(port, path) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './images/prog-brow.png'
  })

  win.loadURL(`http://localhost:${port}/render${path}`)
  win.setRepresentedFilename(path)

  return win
}
