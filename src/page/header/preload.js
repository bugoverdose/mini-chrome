const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("custom_events", {
  red: () => ipcRenderer.invoke("clicked:red"),
  yellow: () => ipcRenderer.invoke("clicked:yellow"),
  green: () => ipcRenderer.invoke("clicked:green"),
  loadURL: (inputValue) => ipcRenderer.send("omnibox:submit", inputValue),
});
// available at renderer via window.custom_events object
// each custom events invokes a custom ipcMain event handler

// preload code format if content from DOM is also needed
// window.addEventListener("DOMContentLoaded", () => {
// });
