const { BrowserWindow } = require("electron");
const { setViewSize } = require("../logic/view");
const { setHeader, setHeaderSize } = require("../page");
const { Tab } = require("./tab");

class Window {
  constructor(browserWindow) {
    if (!browserWindow || !(browserWindow instanceof BrowserWindow)) {
      throw new Error("Window needs a BrowserWindow to be initialized.");
    }
    this.id = `${browserWindow.id}`; // "문자열화하지 않는 경우, --shared-files로 등록되는 버그"

    setHeader(this.id, browserWindow);

    browserWindow.setFullScreenable(true);

    browserWindow.on("resize", () => {
      const [headerView, curPageView] = this.browserWindow.getBrowserViews();
      const [curWidth, curHeight] = browserWindow.getSize();

      setHeaderSize(headerView, curWidth);
      setViewSize(curPageView, curWidth, curHeight);
    });

    this.browserWindow = browserWindow;
    this.tabs = [];
  }

  getId() {
    return this.id;
  }

  getHeaderView() {
    const [headerView, _] = this.browserWindow.getBrowserViews();
    return headerView;
  }

  generateNewTab() {
    const newTab = new Tab();

    this.tabs.push(newTab);
    this.setFocusTabIdByTab(newTab);

    return newTab;
  }

  setPageViewByTab(tab) {
    const views = this.browserWindow.getBrowserViews();
    while (views.length >= 2) {
      this.browserWindow.removeBrowserView(views.pop());
      // views에서 pop해도 browserWindow 내에는 그대로 존재하므로 별도로 remove 필요
    }

    this.browserWindow.addBrowserView(tab.getBrowserView());
  }

  toggleFocusTab(tab) {
    const [curWidth, curHeight] = this.browserWindow.getSize();
    this.setPageViewByTab(tab);
    this.setFocusTabIdByTab(tab);
    setViewSize(tab.getBrowserView(), curWidth, curHeight);
  }

  getBrowserWindow() {
    return this.browserWindow;
  }

  getTabs() {
    return this.tabs.map((tab) => tab.toJSON());
  }

  getTabById(tabId) {
    for (let idx = 0; idx < this.tabs.length; idx++) {
      const tab = this.tabs[idx];
      if (tab.getId() === tabId) return tab;
    }
    throw new Error("Failed To find a tab by the given tabId on the window.");
  }

  deleteTabByTabId(tabId) {
    this.tabs = this.tabs.filter((tab) => tab.getId() !== tabId);
  }

  getFocusTab() {
    return this.getTabById(this.focusTabId);
  }

  getFocusTabId() {
    return this.focusTabId;
  }

  setFocusTabIdByTab(tab) {
    this.focusTabId = tab.getId();
  }

  setFocusTabId(tabId) {
    this.focusTabId = tabId;
  }
}

module.exports = { Window };
