#!/usr/bin/env node

const { app, BrowserWindow } = require('electron')

main()

async function main() {
  app.on('window-all-closed', () => app.quit())

  await app.whenReady()
  appReady()
}


function appReady() {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './images/prog-brow.png'
  })

  win.loadFile('./lib/loading.html')
}
