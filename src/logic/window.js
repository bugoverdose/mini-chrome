const { BrowserWindow, ipcMain } = require("electron");
const {
  INIT_WIDTH,
  INIT_HEIGHT,
  MIN_WIDTH,
  MIN_HEIGHT,
} = require("../constants");
const { windows, Window } = require("../data");
const { inputToValidUrl } = require("../utils/url");
const { setFailedToLoadPage } = require("../page");
const { createNewTab } = require("./tab");

const createWindow = () => {
  let browserWindow = new BrowserWindow({
    width: INIT_WIDTH,
    height: INIT_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    frame: false,
  });

  let window = new Window(browserWindow);

  createNewTab(window);
  windows.add(window);

  setTrafficLightControls(browserWindow);
  setTabEventHandlers(window);
  setOmniboxControls(window);
  setWindowCloseEventHandler(window, browserWindow);
};

const setTrafficLightControls = (browserWindow) => {
  ipcMain.handle("clicked:red", () => {
    browserWindow.close();
  });

  ipcMain.handle("clicked:yellow", () => {
    browserWindow.minimize();
  });

  ipcMain.handle("clicked:green", () => {
    browserWindow.fullScreen = !browserWindow.fullScreen;
  });
};

const setTabEventHandlers = (window) => {
  ipcMain.on("request:allTabs", (e) => {
    const tabs = window.getTabs();
    const focusIdx = window.getFocusTabIdx();

    e.reply("response:allTabs", { tabs, focusIdx });
  });

  ipcMain.on("request:createNewTab", async (e, url) => {
    const newTab = await createNewTab(window);
    const focusIdx = window.getFocusTabIdx();

    e.reply("response:newTab", { tab: newTab.toString(), focusIdx });

    // TODO: url 받아서 탭 및 뷰 생성
  });

  ipcMain.on("request:toggleTab", (_, tabId) => {
    const tab = window.getTabById(parseInt(tabId));
    window.toggleFocusTab(tab);
  });

  ipcMain.on("request:deleteTab", (_, tabId) => {
    window.deleteTabByTabId(tabId);
  });
};

const setOmniboxControls = (window) => {
  ipcMain.on("submitted:omnibox", async (_, { inputValue, focusTabId }) => {
    const validUrl = inputToValidUrl(inputValue);
    const targetTab = window.getTabById(focusTabId);
    const targetPageView = targetTab.getBrowserView();
    try {
      await targetPageView.webContents.loadURL(validUrl);
      // console.log(targetPageView.webContents.getTitle());
      // actuallyUsedValidURL = targetPageView.webContents.getURL());
      // console.log(targetPageView.webContents.canGoBack());
      // console.log(targetPageView.webContents.canGoForward());
      // e.reply("submitted:omnibox:success", validUrl, data, data2);
    } catch (error) {
      setFailedToLoadPage(targetPageView, inputValue, error.code);
      // e.reply("submitted:omnibox:fail", validUrl);
    }

    // if (error.code === "ERR_ABORTED") return;

    // Error: ERR_NAME_NOT_RESOLVED (-105) loading 'https://.com/'
    // errno: -105,
    // code: 'ERR_NAME_NOT_RESOLVED',
    // url: 'https://.com/'
  });
};

const setWindowCloseEventHandler = (window, browserWindow) => {
  browserWindow.on("closed", () => {
    windows.delete(window);
    browserWindow = null;
    window = null;
  });
};

module.exports = { createWindow };
