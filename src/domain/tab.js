const {
  NEW_PAGE_HTML_FILE_ROUTE,
  FAILED_PAGE_HTML_FILE_ROUTE,
  NEW_TAB_FAVICON,
  CONNECTION_FAIL_FAVICON,
} = require("../constants");
const { decodeFailedToLoadURL } = require("../utils/url");
const { setNewTabPageView } = require("../page");
const state = require("../data/state");
const { database } = require("../data/database");

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

    if (url === "" || url === NEW_PAGE_HTML_FILE_ROUTE) return "New Tab";

    if (url.startsWith(FAILED_PAGE_HTML_FILE_ROUTE)) {
      return decodeFailedToLoadURL(url);
    }

    return this.browserView.webContents.getTitle();
  }

  getFavicon() {
    if (this.favicon) return this.favicon;

    return NEW_TAB_FAVICON;
  }

  setFavicon(favicon) {
    this.favicon = favicon;
  }

  setFaviconToConnectionFail() {
    this.favicon = CONNECTION_FAIL_FAVICON;
  }

  getUrl() {
    const url = this.browserView.webContents.getURL();

    if (url === NEW_PAGE_HTML_FILE_ROUTE) return "";

    if (url.startsWith(FAILED_PAGE_HTML_FILE_ROUTE)) {
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

  getIsFavorite() {
    return database.checkIsFavorite(this.getUrl());
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

  toJSON() {
    return {
      id: this.getId(),
      url: this.getUrl(),
      title: this.getTitle(),
      favicon: this.getFavicon(),
      omnibox: this.getOmnibox(),
      isFavorite: this.getIsFavorite(),
      canGoBack: this.getCanGoBack(),
      canGoForward: this.getCanGoForward(),
      pageLoading: this.getPageLoading(),
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

module.exports = { Tab };
