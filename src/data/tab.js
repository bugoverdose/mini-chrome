const { BrowserView } = require("electron");
const {
  newPageHTMLfileRoute,
  failedPageHTMLfileRoute,
} = require("../utils/file");
const state = require("./state");

class Tab {
  constructor(browserView, idx) {
    if (!browserView || !(browserView instanceof BrowserView)) {
      throw new Error("Tab needs a BrowserView to be initialized.");
    }
    if (!browserView || !(browserView instanceof BrowserView)) {
      throw new Error("Tab needs tab index data to be initialized.");
    }

    this.id = ++state.tabId;
    this.browserView = browserView;
    this.idx = idx;
  }

  getBrowserView() {
    return this.browserView;
  }

  getId() {
    return this.id;
  }

  getIdx() {
    return this.idx;
  }

  toString() {
    console.log(this.getId());
    return JSON.stringify({
      id: this.getId(),
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
