const { BrowserView } = require("electron");
const state = require("./state");
const {
  newPageHTMLfileRoute,
  failedPageHTMLfileRoute,
} = require("../constants");

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

    // if (url === "" || url === newPageHTMLfileRoute) return "New Tab";
    if (url === newPageHTMLfileRoute) return "New Tab";
    if (url.startsWith(failedPageHTMLfileRoute)) return "Connection Failed";
    // 실제로 연결을 시도한 이후에 실패한 경우, index.html 대신 검색을 시도했던 url을 지님. 다만, 혹시 모르는 경우를 위해 추가.

    return this.browserView.webContents.getTitle();
  }

  getUrl() {
    const url = this.browserView.webContents.getURL();

    if (url === newPageHTMLfileRoute) return "";
    if (url.startsWith(failedPageHTMLfileRoute)) return "";

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

  toString() {
    return JSON.stringify({
      id: this.getId(),
      idx: this.getIdx(),
      url: this.getUrl(),
      title: this.getTitle(),
      canGoBack: this.getCanGoBack(),
      canGoForward: this.getCanGoForward(),
    });
  }
}

module.exports = { Tab };
