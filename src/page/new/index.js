const { BrowserView } = require("electron");
const path = require("path");

// index.html, preload.js 경로 때문에 여기에 위치함
const setNewTabPageView = (tabId) => {
  const view = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      additionalArguments: [tabId],
    },
  });

  return view;
};

const loadNewTabPage = async (view) => {
  await view.webContents.loadFile(path.join(__dirname, "index.html"));
};

module.exports = { setNewTabPageView, loadNewTabPage };
