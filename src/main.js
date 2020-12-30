const { app, BrowserWindow, ipcMain } = require("electron");
const db  = require("./db.js");
const setDir = require("./config.js")
const fs  = require('fs');
const path = require('path')

//index window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule : true
    },
  });

  win.loadFile("src/pages/Index/index.html");
  win.once("ready-to-show",()=>{
    console.log("onload fn");
    setDir();
  })
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

  win.loadFile("src/pages/error.html");
}

if (db.connect) {
  //ipc methods
  //creating items
  ipcMain.handle("create-item", (event, args) => {
    //db entry
    db.Item.sync();
    //copying the template
    fs.copyFile(`${path.join(process.env.AppData,`.docx Template`)}/Template.docx`,`${path.join(process.env.AppData, `.docx Documents`)}/${args.Title}.docx`,(err)=>{
      if(err){
         throw err;
      }else{
        db.Item.create({ Title : args.Title , Abstract: args.Abstract, Dp: args.Dp })
          .then(()=>{
            console.log('file copied');
            return true;
        });
      }
    });
  });

  //getting items
  ipcMain.handle("List-Items", async (e) => {
    const reuslt = await db.Item.findAll().then((data) => {
      return data;
    });
    return reuslt;
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
  } else {
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
