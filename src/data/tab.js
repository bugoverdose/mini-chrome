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

    if (url === "" || url === newPageHTMLfileRoute) return "New Tab";
    if (url.startsWith(failedPageHTMLfileRoute)) {
      return decodeURI(url)
        .replace(`${failedPageHTMLfileRoute}?`, "")
        .split("#")[0];
      // 연결 실패한 직후에는 시도했던 검색어를 그대로 url로 지님. 다만, 업데이트되는 경우 다음과 같은 구조를 지니게 됨: file:///Users/jeong/mini-chrome/src/page/fail/index.html?asd.asd.com#ERR_NAME_NOT_RESOLVED
    }

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
