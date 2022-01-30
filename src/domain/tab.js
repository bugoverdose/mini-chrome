const {
  newPageHTMLfileRoute,
  failedPageHTMLfileRoute,
  newTabFavicon,
  connectionFailFavicon,
} = require("../constants");
const { decodeFailedToLoadURL } = require("../utils/url");
const { setNewTabPageView } = require("../page");
const state = require("../data/state");

class Tab {
  constructor() {
    this.id = `${++state.tabId}`;
    this.browserView = setNewTabPageView(this.id);
    this.favicon = null;
    this.omnibox = "";
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

    if (url.startsWith(failedPageHTMLfileRoute)) {
      return decodeFailedToLoadURL(url);
    }

    return this.browserView.webContents.getTitle();
  }

  getFavicon() {
    if (this.favicon) return this.favicon;

    return newTabFavicon;
  }

  setFavicon(favicon) {
    this.favicon = favicon;
  }

  setFaviconToConnectionFail() {
    this.favicon = connectionFailFavicon;
  }

  getUrl() {
    const url = this.browserView.webContents.getURL();

    if (url === newPageHTMLfileRoute) return "";

    if (url.startsWith(failedPageHTMLfileRoute)) {
      return decodeFailedToLoadURL(url);
    }

    return url;
  }

  getOmnibox() {
    return this.omnibox;
  }

  setOmnibox(omnibox) {
    this.omnibox = omnibox;
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
      omnibox: this.getOmnibox(),
      canGoBack: this.getCanGoBack(),
      canGoForward: this.getCanGoForward(),
      pageLoading: this.getPageLoading(),
    });
  }
}

module.exports = { Tab };
