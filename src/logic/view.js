const { HEADER_HEIGHT } = require("../constants");
const { loadNewTabPage } = require("../page");

const addNewPageViewOnWindow = async (window, newTab) => {
  const browserWindow = window.getBrowserWindow();
  const [curWidth, curHeight] = browserWindow.getSize();

  const browserView = newTab.getBrowserView();

  setCurrentView(browserWindow, browserView);

  setViewSize(browserView, curWidth, curHeight);
  await loadNewTabPage(browserView);

  return newTab;
};

const setCurrentView = (browserWindow, browserView) => {
  const views = browserWindow.getBrowserViews();
  while (views.length >= 2) {
    browserWindow.removeBrowserView(views.pop());
    // views에서 pop해도 browserWindow 내에는 그대로 존재하므로 별도로 remove 필요
  }
  browserWindow.addBrowserView(browserView);
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
