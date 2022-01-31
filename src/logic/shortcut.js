// const { globalShortcut } = require("electron");
// const { getCurrentFocusedWindow } = require("../utils/shortcut");

// const registerShortCuts = () => {
//   registerGlobalShortCuts();

// const isMac = process.platform === "darwin";
// if (isMac) return registerMacShortCuts();
// registerWindowShortCuts();
// };

// const registerGlobalShortCuts = () => {
//   globalShortcut.register("CommandOrControl+W", () => {
//     const focusedWindow = getCurrentFocusedWindow();

//     const windowId = focusedWindow.getId();
//     const headerView = focusedWindow.getHeaderView();

//     headerView.webContents.send(`shortcut:closeTab:${windowId}`);
//   });
// };

// const registerMacShortCuts = () => {};

// const registerWindowShortCuts = () => {};

// module.exports = { registerShortCuts };
