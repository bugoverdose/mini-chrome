const { BrowserView } = require("electron");
const { OMNIBOX_HEIGHT, HIDDEN_BOTTOM_HEIGHT } = require("../data/constants");

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
    y: OMNIBOX_HEIGHT,
    width: windowWidth,
    height: windowHeight - HIDDEN_BOTTOM_HEIGHT,
  });
};

module.exports = { createDefaultView, setViewSize };
