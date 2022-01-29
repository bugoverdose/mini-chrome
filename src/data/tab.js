const { BrowserView } = require("electron");
const state = require("./state");
const {
  newPageHTMLfileRoute,
  failedPageHTMLfileRoute,
  newTabFavicon,
  connectionFailFavicon,
} = require("../constants");
const { decodeOmniboxInput } = require("../utils/url");

class Tab {
  constructor(browserView) {
    if (!browserView || !(browserView instanceof BrowserView)) {
      throw new Error("Tab needs a BrowserView to be initialized.");
    }

    this.id = `${++state.tabId}`;
    this.browserView = browserView;
    this.favicon = null;
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

  getTitle() {
    const url = this.browserView.webContents.getURL();

    if (url === "" || url === newPageHTMLfileRoute) return "New Tab";
    if (url.startsWith(failedPageHTMLfileRoute)) return decodeOmniboxInput(url);

    return this.browserView.webContents.getTitle();
  }

  getFavicon() {
    const url = this.browserView.webContents.getURL();

    if (url.startsWith(failedPageHTMLfileRoute)) {
      return connectionFailFavicon;
    }

    if (this.favicon) return this.favicon;

    return newTabFavicon;
  }

  setFavicon(favicon) {
    this.favicon = favicon;
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
      url: this.getUrl(),
      title: this.getTitle(),
      favicon: this.getFavicon(),
      canGoBack: this.getCanGoBack(),
      canGoForward: this.getCanGoForward(),
      pageLoading: this.getPageLoading(),
    });
  }
}

module.exports = { Tab };
