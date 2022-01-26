const path = require("path");

const loadNewTabPage = (view) => {
  view.webContents.loadFile(path.join(__dirname, "index.html"));
  // view.webContents.openDevTools();
};

module.exports = { loadNewTabPage };
