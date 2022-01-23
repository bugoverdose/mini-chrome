const { BrowserWindow } = require("electron");
const { INIT_WIDTH, INIT_HEIGHT } = require("../data/constants");
const { windows } = require("../data/state");
const { createDefaultView } = require("./view");

const createWindow = () => {
  window = new BrowserWindow({
    width: INIT_WIDTH,
    height: INIT_HEIGHT,
  });

  createDefaultView(window);

  windows.add(window);

  window.on("closed", () => {
    windows.delete(window);
    window = null;
  });
};

module.exports = { createWindow };
