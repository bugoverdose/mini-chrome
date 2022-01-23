const { app, BrowserWindow } = require("electron");
// const path = require("path");

const INIT_WIDTH = 800;
const INIT_HEIGHT = 600;

let windows = new Set();

const createWindow = () => {
  window = new BrowserWindow({
    width: INIT_WIDTH,
    height: INIT_HEIGHT,
    // webPreferences: {
    //   preload: path.join(__dirname, "preload.js"),
    // },
    // titleBarStyle: "hidden",
  });

  windows.add(window);
  window.webContents.loadURL("https://github.com");

  window.on("closed", () => {
    windows.delete(window);
    window = null;
  });
};

app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  if (windows.size === 0) {
    createWindow();
  }
});

app.on("add-window", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
