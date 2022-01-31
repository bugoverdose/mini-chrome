const { app } = require("electron");
const { windows } = require("./data/state");
const { createWindow } = require("./logic");

app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  if (windows.size === 0) {
    createWindow();
  }
});

app.on("browser-window-created", (e, window) => {
  console.log("browser-window-created");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
