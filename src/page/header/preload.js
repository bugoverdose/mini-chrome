const { contextBridge, ipcRenderer } = require("electron");
const {
  NEW_TAB_FAVICON,
  DEFAULT_FAVICON,
  CONNECTION_FAIL_FAVICON,
} = require("../../constants");
const {
  checkPageLoading,
  setRefreshIcon,
  setPageStopLoadingIcon,
  updateTabState,
  cleanseTabFocus,
  setFocusTabByTabId,
  resetAllTabs,
  createElement,
  createNewTabElement,
} = require("../../utils/header");

const windowId = process.argv.pop(); // from webPreferences.additionalArguments option

// preload에서 main 프로세스의 기능들 사용하고,
// contextBridge를 통해 renderer로 데이터 전송 (프로세스 간 통신)
contextBridge.exposeInMainWorld("custom_events", {
  red: () => ipcRenderer.invoke(`clicked:red:${windowId}`),
  yellow: () => ipcRenderer.invoke(`clicked:yellow:${windowId}`),
  green: () => ipcRenderer.invoke(`clicked:green:${windowId}`),

  initGoBack: (tabId) =>
    ipcRenderer.invoke(`clicked:goBack:${windowId}`, tabId),
  initGoForward: (tabId) =>
    ipcRenderer.invoke(`clicked:goForward:${windowId}`, tabId),
  initReload: (tabId) =>
    ipcRenderer.invoke(`clicked:reload:${windowId}`, tabId),
  initStopLoad: (tabId) =>
    ipcRenderer.invoke(`clicked:stopLoad:${windowId}`, tabId),
});

contextBridge.exposeInMainWorld("request_main", {
  getCurrentTabs: () => ipcRenderer.send(`request:allTabs:${windowId}`),
  createNewTab: (url) =>
    ipcRenderer.send(`request:createNewTab:${windowId}`, url || null),
  toggleFocusTabById: (tabId) =>
    ipcRenderer.send(`request:toggleTab:${windowId}`, tabId),
  deleteTabById: (deleteTabId, updatedFocusTabId) =>
    ipcRenderer.send(`request:deleteTab:${windowId}`, {
      deleteTabId,
      updatedFocusTabId,
    }),

  loadURL: (inputValue, focusTabId) =>
    ipcRenderer.send(`submitted:omnibox:${windowId}`, {
      inputValue,
      focusTabId,
    }),
});

contextBridge.exposeInMainWorld("listen_on", {
  renderAllTabs: (cb) => ipcRenderer.on(`response:allTabs:${windowId}`, cb),
  renderNewTab: (cb) => ipcRenderer.on(`response:newTab:${windowId}`, cb),
  updateTabInfo: (cb) => ipcRenderer.on(`updateTab:${windowId}`, cb),
});

contextBridge.exposeInMainWorld("custom_utils", {
  updateTabState: updateTabState,
  cleanseTabFocus: cleanseTabFocus,
  setFocusTabByTabId: setFocusTabByTabId,
  resetAllTabs: resetAllTabs,
  createElement: createElement,
  createNewTabElement: createNewTabElement,

  checkPageLoading: checkPageLoading,
  setRefreshIcon: setRefreshIcon,
  setPageStopLoadingIcon: setPageStopLoadingIcon,
});

contextBridge.exposeInMainWorld("constants", {
  NEW_TAB_FAVICON: NEW_TAB_FAVICON,
  DEFAULT_FAVICON: DEFAULT_FAVICON,
  CONNECTION_FAIL_FAVICON: CONNECTION_FAIL_FAVICON,
});

// 아래는 영어지만 복붙이 아니라 전부 내가 쓴 내용. 참고자료.

// cache format if needed
// contextBridge.exposeInMainWorld("state", []);

// available at renderer via window.custom_events object
// each custom events invokes a custom ipcMain event handler

// preload code format if content from DOM is also needed
// window.addEventListener("DOMContentLoaded", () => {
// });
