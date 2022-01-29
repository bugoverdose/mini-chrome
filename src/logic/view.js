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
  const windowId = window.getId();

  // browserView.webContents.on("did-finish-load", () => {
  browserView.webContents.on("did-stop-loading", () => {
    const tab = window.getTabById(tabId);
    tab.setOmnibox(tab.getUrl());

    headerView.webContents.send(`updateTab:${windowId}`, tab.toString());
  });

  browserView.webContents.on("did-fail-load", (_, __, errorDescription) => {
    const tab = window.getTabById(tabId);
    tab.setFaviconToConnectionFail();
    // validatedURL(4번째 매개변수): IDN로 인코딩되므로 decodeURL로 디코드 불가 (Internationalized Domain Names)
    setFailedToLoadPage(browserView, tab.getOmnibox(), errorDescription);
  });

  browserView.webContents.on("page-favicon-updated", (e, favicons) => {
    const tab = window.getTabById(tabId);
    if (favicons.length > 0) {
      tab.setFavicon(favicons[0]);
    }

    headerView.webContents.send(`updateTab:${windowId}`, tab.toString());
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
