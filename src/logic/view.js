const { BrowserView } = require("electron");
const { HEADER_HEIGHT } = require("../constants");
const { setNewTabPage } = require("../page");

const createDefaultView = (window) => {
  const view = new BrowserView();
  const [curWidth, curHeight] = window.getSize();

  window.addBrowserView(view);

  setViewSize(view, curWidth, curHeight);
  setNewTabPage(view);
};

const setViewSize = (view, windowWidth, windowHeight) => {
  view.setBounds({
    x: 0,
    y: HEADER_HEIGHT,
    width: windowWidth,
    height: windowHeight - HEADER_HEIGHT,
  });
};

module.exports = { createDefaultView, setViewSize };
