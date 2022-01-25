const { BrowserView } = require("electron");

class Tab {
  constructor(browserView) {
    if (!browserView || !(browserView instanceof BrowserView)) {
      throw new Error("Tab needs a BrowserView to be initialized.");
    }
    this.browserView = browserView;
    this.omniboxUrl = "";
  }

  getOmniboxURl() {
    return this.omniboxUrl;
  }

  setOmniboxURl(url) {
    this.omniboxUrl = url;
  }

  getBrowserView() {
    return this.browserView;
  }
}

module.exports = { Tab };
