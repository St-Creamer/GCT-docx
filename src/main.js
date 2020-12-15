const { app, BrowserWindow } = require("electron");
const db = require('./db')
const { ipcMain } = require("electron");
const docx = require("./docx");
const items = require("./models/items");
const { Item } = require("./db");

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
    db.Item.create({ Abstract: args.Abstract, Dp: args.Dp })
      .then(()=>{
        return true;
      });
      return false;
  });
  
  ipcMain.handle("List-Items",(e) =>{
    db.Item.findAll()
      .then((data)=>{
        console.log(data)
        return data;
      });
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