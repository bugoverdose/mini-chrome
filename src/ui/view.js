const { BrowserView } = require("electron");
const { WINDOW_HEADER_HEIGHT } = require("../data/constants");

const createDefaultView = (window) => {
  const view = new BrowserView();
  const [curWidth, curHeight] = window.getSize();

  window.addBrowserView(view);

  setViewSize(view, curWidth, curHeight);
  view.webContents.loadURL("https://github.com");
};

const setViewSize = (view, windowWidth, windowHeight) => {
  view.setBounds({
    x: 0,
    y: WINDOW_HEADER_HEIGHT,
    width: windowWidth,
    height: windowHeight - WINDOW_HEADER_HEIGHT,
  });
};

module.exports = { createDefaultView, setViewSize };
