const { app } = require("electron");
const { windows } = require("./data/state");
const { createWindow } = require("./ui");

app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  if (windows.size === 0) {
    createWindow();
  }
});

app.on("add-window", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
