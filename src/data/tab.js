const { BrowserView } = require("electron");
const state = require("./state");
const {
  newPageHTMLfileRoute,
  failedPageHTMLfileRoute,
} = require("../constants");
const { decodeOmniboxInput } = require("../utils/url");

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

  getWebContents() {
    return this.browserView.webContents;
  }

  getId() {
    return this.id;
  }

  getIdx() {
    return this.idx;
  }

  getTitle() {
    const url = this.browserView.webContents.getURL();

    if (url === "" || url === newPageHTMLfileRoute) return "New Tab";
    if (url.startsWith(failedPageHTMLfileRoute)) return decodeOmniboxInput(url);

    return this.browserView.webContents.getTitle();
  }

  getUrl() {
    const url = this.browserView.webContents.getURL();

    if (url === newPageHTMLfileRoute) return "";
    if (url.startsWith(failedPageHTMLfileRoute)) return decodeOmniboxInput(url);

    return url;
  }

  getCanGoBack() {
    return this.browserView.webContents.canGoBack();
  }

  goBack() {
    return this.browserView.webContents.goBack();
  }

  getCanGoForward() {
    return this.browserView.webContents.canGoForward();
  }

  goForward() {
    return this.browserView.webContents.goForward();
  }

  getPageLoading() {
    return this.browserView.webContents.isLoading();
  }

  reload() {
    return this.browserView.webContents.reload();
  }

  stopLoad() {
    return this.browserView.webContents.stop();
  }

  toString() {
    return JSON.stringify({
      id: this.getId(),
      idx: this.getIdx(),
      url: this.getUrl(),
      title: this.getTitle(),
      canGoBack: this.getCanGoBack(),
      canGoForward: this.getCanGoForward(),
      pageLoading: this.getPageLoading(),
    });
  }
}

module.exports = { Tab };
