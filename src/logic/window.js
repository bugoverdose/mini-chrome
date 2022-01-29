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
    // 드래그 앤 드롭으로 순서가 바뀐 후에 호출되는 경우, 최종 순서 변경 결과물을 받아서 업데이트한 이후에 렌더링에 사용?

    const focusTabId = window.getFocusTabId();

    e.reply("response:allTabs", { tabs, focusTabId });
  });

  ipcMain.on("request:createNewTab", async (e, url) => {
    const newTab = await createNewTab(window);
    const focusTabId = window.getFocusTabId();
    e.reply("response:newTab", { tab: newTab.toString(), focusTabId });
    // TODO: url 받아서 탭 및 뷰 생성
  });

  ipcMain.on("request:toggleTab", (_, tabId) => {
    const headerView = window.getHeaderView();
    const tab = window.getTabById(tabId);

    window.toggleFocusTab(tab);
    headerView.webContents.send("updateTab", tab.toString());
  });

  ipcMain.on("request:deleteTab", (_, { deleteTabId, updatedFocusTabId }) => {
    window.setFocusTabId(updatedFocusTabId);
    window.deleteTabByTabId(deleteTabId);
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
    const targetTab = window.getTabById(focusTabId);
    const validUrl = inputToValidUrl(inputValue);

    targetTab.setOmnibox(inputValue);

    try {
      await targetTab.getWebContents().loadURL(validUrl);
    } catch (error) {
      // [debug] did-fail-load 이벤트 발생 시점에 setFailedToLoadPage를 실행해야 특정 상황에서 앱 전체 다운되지 않음.
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
