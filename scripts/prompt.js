const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const addDBConnectionBtn = document.getElementById('addNewDBServer')
const remote = electron.remote
var { ipcRenderer } = require("electron")


addDBConnectionBtn.addEventListener('click', function (event) {
  var promptWin = new BrowserWindow({ parent: remote.getCurrentWindow(), width: 400, height: 400, alwaysOnTop: true })
  var windows = BrowserWindow.getAllWindows();
  console.log("------->>", windows.length)
  windows[0].openDevTools();
  windows[1].openDevTools();
  const modalPath = path.join('file://', __dirname, 'views/prompt.html')
  promptWin.on('close', function () { promptWin = null })
  promptWin.loadURL(modalPath)
});

ipcRenderer.on("openDialog", (event, data) => {
  console.log("-------------->><<<><>><<<",data)
  promptWin.close();
  event.returnValue = JSON.stringify(promptOptions, null, '')
})

// Called by the dialog box when closed

ipcRenderer.on("closeDialog", (event, data) => {
  console.log("-------------->><<<><>><<<....",data)
  promptAnswer = data
})