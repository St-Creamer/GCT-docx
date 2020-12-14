const { app, BrowserWindow } = require("electron");
const db = require('./db')
const { ipcMain } = require("electron");
const docx = require("./docx");

docx("fuit gummy");


//index window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("src/index.html");
}
//error window
function errorwindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("src/error.html");
}



if(db.connect){
  //ipc methods
  ipcMain.handle("create-item", (event, args) => {
    db.Item.sync();
    db.Item.create({ Amount: args.Amount, Disc: args.Disc })//this is a promise
  });
  

  //electron windows
  app.whenReady().then(createWindow);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}else{
  app.whenReady().then(errorwindow);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      errorwindow();
    }
  });
}