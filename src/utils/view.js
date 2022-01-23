const { BrowserView } = require("electron");
const { OMNIBOX_HEIGHT, HIDDEN_BOTTOM_HEIGHT } = require("../data/constants");

const createDefaultView = (window) => {
  const view = new BrowserView();
  const [curWidth, curHeight] = window.getSize();

  window.addBrowserView(view);

  view.setBounds({
    x: 0,
    y: OMNIBOX_HEIGHT,
    width: curWidth,
    height: curHeight - HIDDEN_BOTTOM_HEIGHT,
  });
  view.webContents.loadURL("https://github.com");
};

module.exports = { createDefaultView };
