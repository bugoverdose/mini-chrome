const { app, globalShortcut } = require("electron");
const { windows } = require("./data/state");
const { createWindow, registerShortCuts } = require("./logic");

app.on("ready", () => {
  registerShortCuts();

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

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
