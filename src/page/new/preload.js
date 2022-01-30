const { contextBridge, ipcRenderer } = require("electron");

const tabId = process.argv.pop(); // from webPreferences.additionalArguments option

contextBridge.exposeInMainWorld("request_main", {
  getAllFavorites: () => ipcRenderer.send(`fav:requestLoadAll:tab:${tabId}`),
  navToFavorite: (url) => ipcRenderer.send(`fav:nav:tab:${tabId}`, url),

  // url이 일종의 uid가 되도록 관리 필요
  createFavorite: (favData) =>
    ipcRenderer.send(`fav:post:tab:${tabId}`, favData),
  updateFavorite: (favData) =>
    ipcRenderer.send(`fav:update:tab:${tabId}`, favData),
  deleteFavorite: (url) => ipcRenderer.send(`fav:delete:tab:${tabId}`, url),
});

contextBridge.exposeInMainWorld("listen_on", {
  readAllFavorites: (cb) =>
    ipcRenderer.on(`fav:responseLoadedAll:tab:${tabId}`, cb),
});
