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
  setViewUtilsControls(window);
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
    const tab = window.getTabById(tabId);
    window.toggleFocusTab(tab);
  });

  ipcMain.on("request:deleteTab", (_, tabId) => {
    window.deleteTabByTabId(tabId);
  });
};

const setViewUtilsControls = (window) => {
  ipcMain.handle("clicked:goBack", (_, tabId) => {
    window.getTabById(tabId).goBack();
  });

  ipcMain.handle("clicked:goForward", (_, tabId) => {
    window.getTabById(tabId).goForward();
  });

  ipcMain.handle("clicked:reload", (_, tabId) => {
    window.getTabById(tabId).reload();
  });

  ipcMain.handle("clicked:stopLoad", (_, tabId) => {
    window.getTabById(tabId).stopLoad();
  });
};

const setOmniboxControls = (window) => {
  ipcMain.on("submitted:omnibox", async (e, { inputValue, focusTabId }) => {
    const validUrl = inputToValidUrl(inputValue);
    const targetTab = window.getTabById(focusTabId);
    try {
      await targetTab.getWebContents().loadURL(validUrl);
    } catch (error) {
      await setFailedToLoadPage(
        targetTab.getBrowserView(),
        inputValue,
        error.code
      );
    }
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
