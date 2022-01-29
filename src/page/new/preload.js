const { contextBridge, ipcRenderer } = require("electron");

const tabId = process.argv.pop(); // from webPreferences.additionalArguments option

// contextBridge.exposeInMainWorld("request_main", {
//   renderFavorites: () => ipcRenderer.invoke(`loaded:red:${windowId}`),
// });

// contextBridge.exposeInMainWorld("listen_on", {
//   renderFavorites: () => ipcRenderer.invoke(`loaded:red:${windowId}`),
// });

console.log(tabId);
