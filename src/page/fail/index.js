const path = require("path");

const setFailedToLoadPage = async (view, inputValue, errCode) => {
  await view.webContents.loadFile(path.join(__dirname, "index.html"), {
    search: inputValue,
    hash: errCode,
  });

  // view.webContents.openDevTools();
};

module.exports = { setFailedToLoadPage };
