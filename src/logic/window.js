const { BrowserWindow, ipcMain } = require("electron");
const {
  INIT_WIDTH,
  INIT_HEIGHT,
  MIN_WIDTH,
  MIN_HEIGHT,
} = require("../constants");
const { windows, Window } = require("../data");
const { inputToValidUrl } = require("../utils/url");
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

  setTrafficLightControls(window, browserWindow);
  setTabEventHandlers(window);
  setViewUtilsControls(window);
  setOmniboxControls(window);
  setWindowCloseEventHandler(window, browserWindow);
};

const setTrafficLightControls = (window, browserWindow) => {
  const windowId = window.getId();

  ipcMain.handle(`clicked:red:${windowId}`, () => {
    browserWindow.close();
  });

  ipcMain.handle(`clicked:yellow:${windowId}`, () => {
    browserWindow.minimize();
  });

  ipcMain.handle(`clicked:green:${windowId}`, () => {
    browserWindow.fullScreen = !browserWindow.fullScreen;
  });
};

const setTabEventHandlers = (window) => {
  const windowId = window.getId();

  ipcMain.on(`request:allTabs:${windowId}`, (e) => {
    const tabs = window.getTabs();
    // 드래그 앤 드롭으로 순서가 바뀐 후에 호출되는 경우, 최종 순서 변경 결과물을 받아서 업데이트한 이후에 렌더링에 사용?

    const focusTabId = window.getFocusTabId();

    e.reply(`response:allTabs:${windowId}`, { tabs, focusTabId });
  });

  ipcMain.on(`request:createNewTab:${windowId}`, async (e, url) => {
    const newTab = await createNewTab(window);
    const focusTabId = window.getFocusTabId();
    e.reply(`response:newTab:${windowId}`, {
      tab: newTab.toString(),
      focusTabId,
    });
    // TODO: url 받아서 탭 및 뷰 생성
  });

  ipcMain.on(`request:toggleTab:${windowId}`, (_, tabId) => {
    const headerView = window.getHeaderView();
    const tab = window.getTabById(tabId);

    window.toggleFocusTab(tab);
    headerView.webContents.send(`updateTab:${windowId}`, tab.toString());
  });

  ipcMain.on(
    `request:deleteTab:${windowId}`,
    (_, { deleteTabId, updatedFocusTabId }) => {
      window.setFocusTabId(updatedFocusTabId);
      window.deleteTabByTabId(deleteTabId);
    }
  );
};

const setViewUtilsControls = (window) => {
  const windowId = window.getId();

  ipcMain.handle(`clicked:goBack:${windowId}`, (_, tabId) => {
    window.getTabById(tabId).goBack();
  });

  ipcMain.handle(`clicked:goForward:${windowId}`, (_, tabId) => {
    window.getTabById(tabId).goForward();
  });

  ipcMain.handle(`clicked:reload:${windowId}`, (_, tabId) => {
    window.getTabById(tabId).reload();
  });

  ipcMain.handle(`clicked:stopLoad:${windowId}`, (_, tabId) => {
    window.getTabById(tabId).stopLoad();
  });
};

const setOmniboxControls = (window) => {
  const windowId = window.getId();

  ipcMain.on(
    `submitted:omnibox:${windowId}`,
    async (e, { inputValue, focusTabId }) => {
      const targetTab = window.getTabById(focusTabId);
      const validUrl = inputToValidUrl(inputValue);

      targetTab.setOmnibox(inputValue);

      try {
        await targetTab.getWebContents().loadURL(validUrl);
      } catch (error) {
        // [debug] did-fail-load 이벤트 발생 시점에 setFailedToLoadPage를 실행해야 특정 상황에서 앱 전체 다운되지 않음.
      }
    }
  );
};

const setWindowCloseEventHandler = (window, browserWindow) => {
  browserWindow.on("closed", () => {
    windows.delete(window);
    browserWindow = null;
    window = null;
  });
};

module.exports = { createWindow };
