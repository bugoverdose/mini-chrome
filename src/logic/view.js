const { ipcMain } = require("electron");
const { HEADER_HEIGHT } = require("../constants");
const { database } = require("../data/database");
const { loadNewTabPage, setFailedToLoadPage } = require("../page");
const {
  isToggleDevToolsCommand,
  toggleDevTools,
  isCloseTabCommand,
  closeFocusTab,
} = require("../utils/shortcut");

const addNewPageViewOnWindow = async (window, newTab) => {
  const browserWindow = window.getBrowserWindow();
  const browserView = newTab.getBrowserView();
  const [curWidth, curHeight] = browserWindow.getSize();

  window.setPageViewByTab(newTab);
  setViewSize(browserView, curWidth, curHeight);
  configNewView(window, browserView, newTab.id);
  configNewTabView(newTab.id);
  configShortcuts(window, browserView, newTab.id);
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

const configNewTabView = (tabId) => {
  ipcMain.on(`fav:requestLoadAll:tab:${tabId}`, async (e) => {
    const favorites = database.getAllFavorites();

    e.reply(`fav:responseLoadedAll:tab:${tabId}`, {
      data: JSON.stringify(favorites),
    });
  });
};

const configShortcuts = (window, browserView) => {
  const { webContents } = browserView;
  const headerView = window.getHeaderView();
  const windowId = window.getId();
  const isMac = process.platform === "darwin";

  webContents.on("before-input-event", (event, input) => {
    // 디폴트로 등록된 기능들은 일단은 그대로 사용.
    console.log(input);
    if (input.isAutoRepeat) return; // 계속 누르고 있는 경우 첫번째만 실행되고 나머지는 무시
    if (input.type === "keyUp") return; // 처음 누를 때만 인식하고 땔 때는 무시하도록

    if (isCloseTabCommand(input, isMac)) {
      return closeFocusTab(headerView, windowId);
    }
    if (isToggleDevToolsCommand(input, isMac)) {
      return toggleDevTools(webContents);
    }
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
