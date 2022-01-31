const closeFocusTab = (headerView, windowId) => {
  headerView.webContents.send(`shortcut:closeTab:${windowId}`);
};

const toggleDevTools = (webContents) => {
  webContents.isDevToolsOpened()
    ? webContents.closeDevTools()
    : webContents.openDevTools();
};

const isCloseTabCommand = (input, isMac) => {
  return (
    (isMac && isMacCloseTabCommand(input)) ||
    (!isMac && isWindowCloseTabCommand(input))
  );
};

const isMacCloseTabCommand = (input) => {
  return (
    input.meta && // command
    input.code === "KeyW" && // W
    !input.alt &&
    !input.ctrl &&
    !input.shift
  );
};

const isWindowCloseTabCommand = (input) => {
  return (
    input.ctrl && // CTRL
    input.code === "KeyW" && // W
    !input.meta &&
    !input.alt &&
    !input.shift
  );
};

const isToggleDevToolsCommand = (input, isMac) => {
  return (
    isDefaultDevToolCommand(input) ||
    (isMac && isMacDevToolCommand(input)) ||
    (!isMac && isWindowDevToolCommand(input))
  );
};

const isDefaultDevToolCommand = (input) => {
  return (
    input.code === "F12" && // F12
    !input.meta &&
    !input.alt &&
    !input.ctrl &&
    !input.shift
  );
};

const isMacDevToolCommand = (input) => {
  return (
    input.meta && // command
    input.alt && // option
    input.code === "KeyI" && // I
    !input.ctrl &&
    !input.shift
  );
};

const isWindowDevToolCommand = (input) => {
  return (
    input.ctrl && // CTRL
    input.shift && // SHIFT
    input.code === "KeyI" && // I
    !input.meta &&
    !input.alt
  );
};

module.exports = {
  isCloseTabCommand,
  isToggleDevToolsCommand,
  closeFocusTab,
  toggleDevTools,
};
