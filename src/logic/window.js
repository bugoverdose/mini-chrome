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
    const activeIdx = window.getActiveTabIdx();

    e.reply("response:allTabs", { tabs, activeIdx });
  });
};

const setOmniboxControls = (window) => {
  ipcMain.on("submitted:omnibox", async (e, inputValue) => {
    const validUrl = inputToValidUrl(inputValue);

    const [_, targetView] = window.getVisibleAreas();
    try {
      await targetView.webContents.loadURL(validUrl);
      // console.log(targetView.webContents.getTitle());
      // actuallyUsedValidURL = targetView.webContents.getURL());
      // console.log(targetView.webContents.canGoBack());
      // console.log(targetView.webContents.canGoForward());
      // e.reply("submitted:omnibox:success", validUrl, data, data2);
    } catch (error) {
      setFailedToLoadPage(targetView, inputValue, error.code);
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
