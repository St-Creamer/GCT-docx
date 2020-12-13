const { app, BrowserWindow } = require("electron");
const { dbAuth } = require("./db.js");
const db = require("./db.js");
const { ipcMain } = require("electron");

ipcMain.handle("create-item", (event, args) => {
  db.Item.sync();
  db.Item.create({ Amount: args.Amount, Disc: args.Disc }).then((data) => {
    console.log(data);
  });
});

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
