const { BrowserWindow, ipcMain } = require("electron");
const {
  INIT_WIDTH,
  INIT_HEIGHT,
  MIN_WIDTH,
  MIN_HEIGHT,
} = require("../constants");
const { windows, Window } = require("../data");
const { inputToValidUrl } = require("../utils/url");
const { setFailedToLoadPage } = require("./fail");
const { setHeader, setHeaderSize } = require("./header");
const { createDefaultView, setViewSize } = require("./view");

const createWindow = () => {
  let browserWindow = new BrowserWindow({
    width: INIT_WIDTH,
    height: INIT_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    frame: false,
  });

  setHeader(browserWindow);
  createDefaultView(browserWindow);

  let window = new Window(browserWindow);

  windows.add(window);

  browserWindow.setFullScreenable(true);

  browserWindow.on("resize", () => {
    const [headerView, activeView] = window.getVisibleAreas();
    const [curWidth, curHeight] = browserWindow.getSize();

    setHeaderSize(headerView, curWidth);
    setViewSize(activeView, curWidth, curHeight);
  });

  browserWindow.on("closed", () => {
    windows.delete(window);
    browserWindow = null;
    window = null;
  });

  ipcMain.handle("clicked:red", () => {
    browserWindow.close();
  });

  ipcMain.handle("clicked:yellow", () => {
    browserWindow.minimize();
  });

  ipcMain.handle("clicked:green", () => {
    browserWindow.fullScreen = !browserWindow.fullScreen;
  });

  ipcMain.on("omnibox:submit", async (e, inputValue) => {
    const validUrl = inputToValidUrl(inputValue);

    const [_, targetView] = window.getVisibleAreas();
    try {
      await targetView.webContents.loadURL(validUrl);
      // console.log(targetView.webContents.getTitle());
      // actuallyUsedValidURL = targetView.webContents.getURL());
      // console.log(targetView.webContents.canGoBack());
      // console.log(targetView.webContents.canGoForward());
      // e.reply("omnibox:submit:success", validUrl, data, data2);
    } catch (error) {
      // inputValue, error.code
      setFailedToLoadPage(targetView);
      // e.reply("omnibox:submit:fail", validUrl);
    }

    // if (error.code === "ERR_ABORTED") return;

    // Error: ERR_NAME_NOT_RESOLVED (-105) loading 'https://.com/'
    // errno: -105,
    // code: 'ERR_NAME_NOT_RESOLVED',
    // url: 'https://.com/'
  });
};

module.exports = { createWindow };
