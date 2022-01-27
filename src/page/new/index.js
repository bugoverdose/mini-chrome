const path = require("path");

const loadNewTabPage = async (view) => {
  await view.webContents.loadFile(path.join(__dirname, "index.html"));
};

module.exports = { loadNewTabPage };
