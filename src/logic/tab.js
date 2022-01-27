const { BrowserView } = require("electron");
const { addNewPageViewOnWindow } = require("./view");

const createNewTab = (window) => {
  const browserView = new BrowserView();
  const newTab = window.createNewTabWithView(browserView);

  return addNewPageViewOnWindow(window, newTab);
};

module.exports = { createNewTab };
