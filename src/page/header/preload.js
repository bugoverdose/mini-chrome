const { contextBridge, ipcRenderer } = require("electron");
const {
  checkPageLoading,
  setRefreshIcon,
  setPageStopLoadingIcon,
  updateTabState,
  cleanseTabFocus,
  setFocusTabByTabId,
  resetAllTabs,
  createNewTabElement,
} = require("./utils");

// preload에서 main 프로세스의 기능들 사용하고,
// contextBridge를 통해 renderer로 데이터 전송 (프로세스 간 통신)
contextBridge.exposeInMainWorld("custom_events", {
  red: () => ipcRenderer.invoke("clicked:red"),
  yellow: () => ipcRenderer.invoke("clicked:yellow"),
  green: () => ipcRenderer.invoke("clicked:green"),

  initGoBack: (tabId) => ipcRenderer.invoke("clicked:goBack", tabId),
  initGoForward: (tabId) => ipcRenderer.invoke("clicked:goForward", tabId),
  initReload: (tabId) => ipcRenderer.invoke("clicked:reload", tabId),
  initStopLoad: (tabId) => ipcRenderer.invoke("clicked:stopLoad", tabId),
});

contextBridge.exposeInMainWorld("request_main", {
  getCurrentTabs: () => ipcRenderer.send("request:allTabs"),
  createNewTab: (url) => ipcRenderer.send("request:createNewTab", url || null),
  toggleFocusTabById: (tabId) => ipcRenderer.send("request:toggleTab", tabId),
  deleteTabById: (deleteTabId, updatedFocusTabId) =>
    ipcRenderer.send("request:deleteTab", { deleteTabId, updatedFocusTabId }),

  loadURL: (inputValue, focusTabId) =>
    ipcRenderer.send("submitted:omnibox", { inputValue, focusTabId }),
});

contextBridge.exposeInMainWorld("listen_on", {
  renderAllTabs: (cb) => ipcRenderer.on("response:allTabs", cb),
  renderNewTab: (cb) => ipcRenderer.on("response:newTab", cb),
  updateTabInfo: (cb) => ipcRenderer.on("updateTab", cb),
});

contextBridge.exposeInMainWorld("custom_utils", {
  updateTabState: updateTabState,
  cleanseTabFocus: cleanseTabFocus,
  setFocusTabByTabId: setFocusTabByTabId,
  resetAllTabs: resetAllTabs,
  createNewTabElement: createNewTabElement,

  checkPageLoading: checkPageLoading,
  setRefreshIcon: setRefreshIcon,
  setPageStopLoadingIcon: setPageStopLoadingIcon,
});

// 아래는 영어지만 복붙이 아니라 전부 내가 쓴 내용. 참고자료.

// cache format if needed
// contextBridge.exposeInMainWorld("state", []);

// available at renderer via window.custom_events object
// each custom events invokes a custom ipcMain event handler

// preload code format if content from DOM is also needed
// window.addEventListener("DOMContentLoaded", () => {
// });
