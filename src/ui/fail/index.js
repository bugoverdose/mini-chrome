const path = require("path");

const setFailedToLoadPage = (view) => {
  view.webContents.loadFile(path.join(__dirname, "index.html"));

  view.webContents.openDevTools();
};

module.exports = { setFailedToLoadPage };
