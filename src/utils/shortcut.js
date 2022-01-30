const state = require("../data/state");

const getCurrentFocusedWindow = () => {
  const focusedWindowId = getCurrentFocusedWindowId();

  for (let value of state.windows) {
    if (value.id === focusedWindowId) {
      return value;
    }
  }
  return null;
};

const getCurrentFocusedWindowId = () => {
  return state.windowId;
};

module.exports = { getCurrentFocusedWindow };
