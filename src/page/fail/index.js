const path = require("path");

const setFailedToLoadPage = async (view, inputValue, errorDescription) => {
  await view.webContents.loadFile(path.join(__dirname, "index.html"), {
    search: inputValue,
    hash: errorDescription,
  });

  view.webContents.openDevTools();
};

module.exports = { setFailedToLoadPage };
