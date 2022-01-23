const { BrowserView } = require("electron");
const { WINDOW_HEADER_HEIGHT } = require("../data/constants");
const path = require("path");

const setHeader = (window) => {
  const view = new BrowserView();
  const [curWidth] = window.getSize();

  window.addBrowserView(view);

  setHeaderSize(view, curWidth);
  view.webContents.loadFile(path.join(__dirname, "index.html"));
};

const setHeaderSize = (view, windowWidth) => {
  view.setBounds({
    x: 0,
    y: 0,
    width: windowWidth,
    height: WINDOW_HEADER_HEIGHT,
  });
};

module.exports = { setHeader, setHeaderSize };
