const path = require("path");

const setFailedToLoadPage = (view, inputValue, errCode) => {
  view.webContents.loadFile(path.join(__dirname, "index.html"), {
    search: inputValue,
    hash: errCode,
  });

  // view.webContents.openDevTools();
};

module.exports = { setFailedToLoadPage };
