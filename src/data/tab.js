const { BrowserView } = require("electron");

const newPageHTMLfileRoute =
  "file:///Users/jeong/mini-chrome/src/page/new/index.html";
const failedPageHTMLfileRoute =
  "file:///Users/jeong/mini-chrome/src/page/fail/index.html";

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

  toString() {
    return JSON.stringify({
      idx: this.getIdx(),
      url: this.getUrl(),
      title: this.getTitle(),
      canGoBack: this.getCanGoBack(),
      canGoForward: this.getCanGoForward(),
    });
  }

  getTitle() {
    const url = this.browserView.webContents.getURL();

    if (url === newPageHTMLfileRoute) return "New Tab";
    if (url === failedPageHTMLfileRoute) return "Connection Failed";

    return this.browserView.webContents.getTitle();
  }

  getUrl() {
    const url = this.browserView.webContents.getURL();

    if (url === newPageHTMLfileRoute) return "";
    if (url === failedPageHTMLfileRoute) return "";

    return url;
  }

  getCanGoBack() {
    return this.browserView.webContents.canGoBack();
  }

  getCanGoForward() {
    return this.browserView.webContents.canGoForward();
  }
}

module.exports = { Tab };
