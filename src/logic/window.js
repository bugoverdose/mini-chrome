const { BrowserWindow, ipcMain } = require("electron");
const {
  INIT_WIDTH,
  INIT_HEIGHT,
  MIN_WIDTH,
  MIN_HEIGHT,
} = require("../constants");
const { Window } = require("../domain");
const state = require("../data/state");
const { inputToValidUrl } = require("../utils/url");
const { createNewTab } = require("./tab");
const { database } = require("../data/database");

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
  state.windows.add(window);

  setTrafficLightControls(window, browserWindow);
  setTabEventHandlers(window);
  setViewUtilsControls(window);
  setOmniboxControls(window);
  setFavoriteControls(window);
  setWindowFocusEventHandler(window);
  setWindowCloseEventHandler(window, browserWindow);

  browserWindow.focus(); // 설정 완료된 이후에 초점 이동
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

    if (tabs.length === 0) return;

    const focusTabId = window.getFocusTabId();

    e.reply(`response:allTabs:${windowId}`, {
      tabs: JSON.stringify(tabs),
      focusTabId,
    });
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

  ipcMain.on(`request:toggleTab:${windowId}`, (e, tabId) => {
    const tab = window.getTabById(tabId);

    window.toggleFocusTab(tab);
    e.reply(`updateTab:${windowId}`, tab.toString());
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

const setFavoriteControls = (window) => {
  const windowId = window.getId();

  ipcMain.on(`fav:mutate:${windowId}`, async (e, { focusTabId, action }) => {
    const targetTab = window.getTabById(focusTabId);
    const { title, url, favicon } = targetTab.toJSON();

    if (action === "create") {
      database.addFavorite(title, url, favicon);
    }

    if (action === "delete") {
      database.deleteFavoriteByUrl(url);
    }

    e.reply(`response:isFav:${windowId}`, {
      isFav: targetTab.getIsFavorite(),
      focusTabId,
    });
  });
};

const setWindowFocusEventHandler = (window) => {
  const windowId = window.getId();
  const browserWindow = window.getBrowserWindow();
  const headerView = window.getHeaderView();

  // 다른 앱 혹은 다른 윈도우에서 해당 윈도우로 되돌아온 시점에 딱 한 번
  browserWindow.on("focus", () => {
    const focusTab = window.getFocusTab();

    if (focusTab.isNew()) headerView.webContents.focus(); // browser window로 간 focus를 browser view로 그대로 이동시키기 (서로 별개의 프로세스)

    headerView.webContents.send(`updateTab:${windowId}`, focusTab.toString());
  });
};

const setWindowCloseEventHandler = (window, browserWindow) => {
  browserWindow.on("closed", () => {
    state.windows.delete(window);
    browserWindow = null;
    window = null;
  });
};

module.exports = { createWindow };
