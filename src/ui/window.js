const { BrowserWindow } = require("electron");
const { INIT_WIDTH, INIT_HEIGHT } = require("../constants");
const { windows, Window } = require("../data");
const { setHeader, setHeaderSize } = require("./header");
const { createDefaultView, setViewSize } = require("./view");

const createWindow = () => {
  let browserWindow = new BrowserWindow({
    width: INIT_WIDTH,
    height: INIT_HEIGHT,
    frame: false,
  });

  setHeader(browserWindow);
  createDefaultView(browserWindow);

  let window = new Window(browserWindow);

  windows.add(window);

  browserWindow.on("resize", () => {
    const [headerView, activeView] = window.getVisibleAreas();
    const [curWidth, curHeight] = browserWindow.getSize();

    setHeaderSize(headerView, curWidth);
    setViewSize(activeView, curWidth, curHeight);
  });

  browserWindow.on("closed", () => {
    windows.delete(window);
    browserWindow = null;
    window = null;
  });
};

module.exports = { createWindow };
