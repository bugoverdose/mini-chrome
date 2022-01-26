const path = require("path");

const newPageHTMLfileRoute = path.join(__dirname, "index.html");

const loadNewTabPage = (view) => {
  view.webContents.loadFile(newPageHTMLfileRoute);
  // view.webContents.openDevTools();
};

module.exports = { loadNewTabPage };
