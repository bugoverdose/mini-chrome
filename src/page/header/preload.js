const { contextBridge, ipcRenderer } = require("electron");

// preload에서 main 프로세스의 기능들 사용하고,
// contextBridge를 통해 renderer로 데이터 전송 (프로세스 간 통신)
contextBridge.exposeInMainWorld("custom_events", {
  red: () => ipcRenderer.invoke("clicked:red"),
  yellow: () => ipcRenderer.invoke("clicked:yellow"),
  green: () => ipcRenderer.invoke("clicked:green"),
  loadURL: (inputValue) => ipcRenderer.send("omnibox:submit", inputValue),
});

// contextBridge.exposeInMainWorld("state", []);

// available at renderer via window.custom_events object
// each custom events invokes a custom ipcMain event handler

// preload code format if content from DOM is also needed
// window.addEventListener("DOMContentLoaded", () => {
// });
