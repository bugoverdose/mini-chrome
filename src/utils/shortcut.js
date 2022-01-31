const closeFocusTab = (headerView, windowId) => {
  headerView.webContents.send(`shortcut:closeTab:${windowId}`);
};

const toggleDevTools = (webContents) => {
  webContents.isDevToolsOpened()
    ? webContents.closeDevTools()
    : webContents.openDevTools();
};

module.exports = {
  closeFocusTab,
  toggleDevTools,
};
