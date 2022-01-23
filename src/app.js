const { app } = require("electron");
const { createWindow } = require("./window");

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
