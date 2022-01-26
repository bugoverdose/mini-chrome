const { BrowserWindow } = require("electron");
const { setViewSize } = require("../logic/view");
const { setHeader, setHeaderSize } = require("../page");
const { Tab } = require("./tab");

class Window {
  constructor(browserWindow) {
    if (!browserWindow || !(browserWindow instanceof BrowserWindow)) {
      throw new Error("Window needs a BrowserWindow to be initialized.");
    }

    setHeader(browserWindow);

    browserWindow.setFullScreenable(true);

    browserWindow.on("resize", () => {
      const [headerView, activeView] = this.getVisibleAreas();
      const [curWidth, curHeight] = browserWindow.getSize();

      setHeaderSize(headerView, curWidth);
      setViewSize(activeView, curWidth, curHeight);
    });

    this.browserWindow = browserWindow;
    this.tabs = [];
  }

  getVisibleAreas() {
    const views = this.browserWindow.getBrowserViews();
    const headerView = views[0];
    const activeView = views[1];
    return [headerView, activeView];
  }

  getBrowserWindow() {
    return this.browserWindow;
  }

  getTabs() {
    return this.tabs.map((tab) => tab.toString());
  }

  getActiveTabIdx() {
    return this.activeTabIdx;
  }

  setActiveTabIdx(idx) {
    this.activeTabIdx = idx;
  }

  createNewTabWithView(browserView) {
    const newTabIndex = this.tabs.length;
    const newTab = new Tab(browserView, newTabIndex);

    this.tabs.push(newTab);
    this.setActiveTabIdx(newTabIndex);

    return newTab;
  }
}

module.exports = { Window };
