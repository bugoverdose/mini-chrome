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
    const views = browserWindow.getBrowserViews();
    const [curWidth, curHeight] = browserWindow.getSize();

    setHeaderSize(views[0], curWidth);
    setViewSize(views[1], curWidth, curHeight);
  });

  browserWindow.on("closed", () => {
    windows.delete(window);
    browserWindow = null;
    window = null;
  });
};

module.exports = { createWindow };
