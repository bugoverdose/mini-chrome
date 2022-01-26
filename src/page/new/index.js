const path = require("path");

const setNewTabPage = (view) => {
  view.webContents.loadFile(path.join(__dirname, "index.html"));

  // view.webContents.openDevTools();
};

module.exports = { setNewTabPage };
