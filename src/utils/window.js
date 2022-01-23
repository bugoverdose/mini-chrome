const { BrowserWindow } = require("electron");
const { INIT_WIDTH, INIT_HEIGHT } = require("../data/constants");
const { windows } = require("../data/state");
const { setHeader, setHeaderSize } = require("../ui");
const { createDefaultView, setViewSize } = require("./view");

const createWindow = () => {
  window = new BrowserWindow({
    width: INIT_WIDTH,
    height: INIT_HEIGHT,
    titleBarStyle: "hidden",
  });

  setHeader(window);
  createDefaultView(window);

  windows.add(window);

  window.on("resize", () => {
    const views = window.getBrowserViews();
    const [curWidth, curHeight] = window.getSize();

    setHeaderSize(views[0], curWidth);

    // TODO: 하나의 창에 복수의 view가 존재 가능해지면 수정 필수
    setViewSize(views[1], curWidth, curHeight);
  });

  window.on("closed", () => {
    windows.delete(window);
    window = null;
  });
};

module.exports = { createWindow };
