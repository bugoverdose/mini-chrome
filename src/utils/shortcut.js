const isToggleDevToolsCommand = (input, isMac) => {
  return (
    isDefaultDevToolCommand(input) ||
    (isMac && isMacDevToolCommand(input)) ||
    (!isMac && isWindowDevToolCommand(input))
  );
};

const toggleDevTools = (webContents) => {
  webContents.isDevToolsOpened()
    ? webContents.closeDevTools()
    : webContents.openDevTools();
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

// const state = require("../data/state");

// const getCurrentFocusedWindow = () => {
//   const focusedWindowId = getCurrentFocusedWindowId();

//   for (let value of state.windows) {
//     if (value.id === focusedWindowId) {
//       return value;
//     }
//   }
//   return null;
// };

// const getCurrentFocusedWindowId = () => {
//   return state.windowId;
// };

// module.exports = { getCurrentFocusedWindow };
module.exports = {
  isToggleDevToolsCommand,
  toggleDevTools,
};
