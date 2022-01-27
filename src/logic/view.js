const { HEADER_HEIGHT } = require("../constants");
const { loadNewTabPage } = require("../page");

const addNewPageViewOnWindow = async (window, newTab) => {
  const browserWindow = window.getBrowserWindow();
  const browserView = newTab.getBrowserView();
  const [curWidth, curHeight] = browserWindow.getSize();

  browserWindow.addBrowserView(browserView);

  setViewSize(browserView, curWidth, curHeight);
  await loadNewTabPage(browserView);

  return newTab;
};

const setViewSize = (view, windowWidth, windowHeight) => {
  view.setBounds({
    x: 0,
    y: HEADER_HEIGHT,
    width: windowWidth,
    height: windowHeight - HEADER_HEIGHT,
  });
};

module.exports = { addNewPageViewOnWindow, setViewSize };
