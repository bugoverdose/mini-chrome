const { HEADER_HEIGHT } = require("../constants");
const { loadNewTabPage } = require("../page");

const addNewPageViewOnWindow = async (window, newTab) => {
  const browserWindow = window.getBrowserWindow();
  const browserView = newTab.getBrowserView();
  const [curWidth, curHeight] = browserWindow.getSize();

  window.setPageViewByTab(newTab);
  setViewSize(browserView, curWidth, curHeight);
  configNewView(window, browserView, newTab.id);
  await loadNewTabPage(browserView);

  return newTab;
};

const configNewView = (window, browserView, tabId) => {
  const headerView = window.getHeaderView();

  browserView.webContents.on("did-finish-load", () => {
    const tabData = window.getTabById(tabId).toString();
    headerView.webContents.send("updateTab", tabData);
  });
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
