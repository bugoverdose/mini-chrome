const { addNewPageViewOnWindow } = require("./view");

const createNewTab = (window, url) => {
  const newTab = window.generateNewTab();

  return addNewPageViewOnWindow(window, newTab, url);
};

module.exports = { createNewTab };
