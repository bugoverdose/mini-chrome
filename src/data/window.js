const { BrowserWindow } = require("electron");

class Window {
  constructor(browserWindow) {
    if (!browserWindow || !(browserWindow instanceof BrowserWindow)) {
      throw new Error("Window 객체는 BrowserWindow 객체를 필요로 합니다");
    }
    this.browserWindow = browserWindow;
  }

  getBrowserWindow() {
    return this.browserWindow;
  }
}

module.exports = { Window };
