const { app, BrowserWindow, ipcMain } = require("electron");
const db  = require("./db.js");
const fs  = require('fs');

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

if (db.connect) {
  //ipc methods
  //creating items
  ipcMain.handle("create-item", (event, args) => {

    db.Item.sync();
    db.Item.create({ Title : args.Title , Abstract: args.Abstract, Dp: args.Dp }).then(() => {
      // //creating corresponding docx file
      // if(docx(args.Abstract)){
      //   return true;
      // }
      // return false;

      //copying the template
      fs.copyFile('./src/Template.docx',`./documents/${args.Title}.docx`,(err)=>{
        if(err) throw err;
        console.log('file copied')
      })
      return true;
    });
    return false;
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
