const { BrowserView } = require("electron");

class Tab {
  constructor(browserView) {
    if (!browserView || !(browserView instanceof BrowserView)) {
      throw new Error("Tab needs a BrowserView to be initialized.");
    }
    this.browserView = browserView;
  }

  getBrowserView() {
    return this.browserView;
  }
}

module.exports = { Tab };
