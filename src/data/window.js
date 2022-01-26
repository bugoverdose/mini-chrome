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

    // const browserViews = browserWindow.getBrowserViews();
    // this.addNewTabWithView(browserViews[1]);
    // this.setActiveTabIdx(0);
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
