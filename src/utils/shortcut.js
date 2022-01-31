const toggleDevTools = (webContents) => {
  webContents.isDevToolsOpened()
    ? webContents.closeDevTools()
    : webContents.openDevTools();
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
  //   return (
  //   );
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
module.exports = { isMacDevToolCommand, toggleDevTools };
