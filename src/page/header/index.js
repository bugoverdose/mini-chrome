const { BrowserView } = require("electron");
const { HEADER_HEIGHT } = require("../../constants");
const path = require("path");

const setHeader = (windowId, browserWindow) => {
  const view = new BrowserView({
    webPreferences: {
      devTools: false, // 코드를 통해 여는 것만 방어. can not use BrowserWindow.webContents.openDevTools() to open DevTools
      preload: path.join(__dirname, "preload.js"),
      additionalArguments: [windowId], // A list of strings that will be appended to process.argv at preload script
    },
  });
  const [curWidth] = browserWindow.getSize();

  // view.webContents.openDevTools();

  browserWindow.addBrowserView(view);

  setHeaderSize(view, curWidth);
  view.webContents.loadFile(path.join(__dirname, "index.html"));
};

const setHeaderSize = (view, windowWidth) => {
  view.setBounds({
    x: 0,
    y: 0,
    width: windowWidth,
    height: HEADER_HEIGHT,
  });
};

module.exports = { setHeader, setHeaderSize };
