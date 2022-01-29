const { addNewPageViewOnWindow } = require("./view");

const createNewTab = (window) => {
  const newTab = window.generateNewTab();

  return addNewPageViewOnWindow(window, newTab);
};

module.exports = { createNewTab };
