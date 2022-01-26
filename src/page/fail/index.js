const path = require("path");

const failedPageHTMLfileRoute = path.join(__dirname, "index.html");

const setFailedToLoadPage = (view, inputValue, errCode) => {
  view.webContents.loadFile(failedPageHTMLfileRoute, {
    search: inputValue,
    hash: errCode,
  });

  // view.webContents.openDevTools();
};

module.exports = { setFailedToLoadPage, failedPageHTMLfileRoute };
