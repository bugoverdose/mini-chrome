const { HEADER_HEIGHT } = require("../constants");
const { loadNewTabPage, setFailedToLoadPage } = require("../page");

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

  // browserView.webContents.on("did-finish-load", () => {
  browserView.webContents.on("did-stop-loading", () => {
    const tabData = window.getTabById(tabId).toString();
    headerView.webContents.send("updateTab", tabData);
  });

  browserView.webContents.on(
    "did-fail-load",
    (_, __, errorDescription, validatedURL) => {
      const tab = window.getTabById(tabId);
      tab.setFaviconToConnectionFail();
      setFailedToLoadPage(browserView, validatedURL, errorDescription);
    }
  );

  browserView.webContents.on("page-favicon-updated", (e, favicons) => {
    const curTab = window.getTabById(tabId);
    if (favicons.length > 0) {
      curTab.setFavicon(favicons[0]);
    }

    headerView.webContents.send("updateTab", curTab.toString());
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
