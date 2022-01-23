const { BrowserWindow } = require("electron");
const { INIT_WIDTH, INIT_HEIGHT } = require("../data/constants");
const { windows } = require("../data/state");
const { createDefaultView, setViewSize } = require("./view");

const createWindow = () => {
  window = new BrowserWindow({
    width: INIT_WIDTH,
    height: INIT_HEIGHT,
  });

  createDefaultView(window);

  windows.add(window);

  window.on("resize", () => {
    const views = window.getBrowserViews();
    const [curWidth, curHeight] = window.getSize();

    // TODO: 하나의 창에 복수의 view가 존재 가능해지면 수정 필수
    setViewSize(views[0], curWidth, curHeight);
  });

  window.on("closed", () => {
    windows.delete(window);
    window = null;
  });
};

module.exports = { createWindow };
