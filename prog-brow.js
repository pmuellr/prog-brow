#!/usr/bin/env node

const { app, BrowserWindow } = require('electron')

main()

async function main() {
  const { start: serverStart } = await import('./lib/server.mjs')

  const port = await serverStart()

  app.on('window-all-closed', () => app.quit())

  await app.whenReady()
  appReady(port)
}

/** @type { (port: number) => void } */
function appReady(port) {
  createWindow(port)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(port)
    }
  })
}

/** @type { (port: number) => BrowserWindow } */
function createWindow(port) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './images/prog-brow.png'
  })

  win.loadURL(`http://localhost:${port}/render/Users/pmuellr/Projects/pmuellr/prog-brow/prog-brow.js`)

  return win
}
