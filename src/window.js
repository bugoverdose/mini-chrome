const { BrowserWindow } = require("electron");
const { INIT_WIDTH, INIT_HEIGHT } = require("./constants");
const { windows } = require("./state");

const createWindow = () => {
  window = new BrowserWindow({
    width: INIT_WIDTH,
    height: INIT_HEIGHT,
  });

  windows.add(window);
  window.webContents.loadURL("https://github.com");

  window.on("closed", () => {
    windows.delete(window);
    window = null;
  });
};

module.exports = { createWindow };
