const { BrowserView } = require("electron");

class Tab {
  constructor(browserView, idx) {
    if (!browserView || !(browserView instanceof BrowserView)) {
      throw new Error("Tab needs a BrowserView to be initialized.");
    }
    if (!browserView || !(browserView instanceof BrowserView)) {
      throw new Error("Tab needs tab index data to be initialized.");
    }
    this.browserView = browserView;
    this.idx = idx;
  }

  getBrowserView() {
    return this.browserView;
  }

  getIdx() {
    return this.idx;
  }

  getTitle() {
    return this.browserView.webContents.getTitle();
  }

  getUrl() {
    return this.browserView.webContents.getURL();
  }

  getCanGoBack() {
    return this.browserView.webContents.canGoBack();
  }

  getCanGoForward() {
    return this.browserView.webContents.canGoForward();
  }
}

module.exports = { Tab };
