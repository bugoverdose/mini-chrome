const { BrowserWindow } = require("electron");
const { Tab } = require("./tab");

class Window {
  constructor(browserWindow) {
    if (!browserWindow || !(browserWindow instanceof BrowserWindow)) {
      throw new Error("Window needs a BrowserWindow to be initialized.");
    }

    this.browserWindow = browserWindow;
    this.tabs = [];

    const browserViews = browserWindow.getBrowserViews();
    this.addNewTabWithView(browserViews[1]);
    this.setActiveTabIdx(0);
  }

  getVisibleAreas() {
    const views = this.browserWindow.getBrowserViews();
    const headerView = views[0];
    const activeView = views[1];
    return [headerView, activeView];
  }

  setCurrentViewURL(validURL) {
    const [_, activeView] = this.getVisibleAreas();
    activeView.webContents.loadURL(validURL);
  }

  getBrowserWindow() {
    return this.browserWindow;
  }

  addNewTabWithView(browserView) {
    const newTab = new Tab(browserView);
    this.tabs.push(newTab);
  }

  getActiveTab() {
    return this.tabs[this.activeTabIdx];
  }

  setActiveTabIdx(idx) {
    this.activeTabIdx = idx;
  }
}

module.exports = { Window };
