const { Menu, MenuItem } = require("electron");
const { toggleDevTools, closeFocusTab } = require("../utils/shortcut");

const isMac = process.platform === "darwin";

const initMenu = () => {
  const menu = new Menu();

  menu.append(
    new MenuItem({
      label: "Mini Chrome",
      submenu: [closeTabMenu, ...toggleDevToolsMenu],
    })
  );

  Menu.setApplicationMenu(menu);
};

const closeTabMenu = {
  label: "Close Tab",
  accelerator: "CommandOrControl+W",
  click: (_, browserWindow) => {
    const [headerView, __] = browserWindow.getBrowserViews();
    closeFocusTab(headerView, browserWindow.id);
  },
};

const toggleDevToolsMenu = [
  {
    label: "DevTools (F12)",
    accelerator: isMac ? "Command+Option+I" : "Ctrl+Shift+I",
    click: (_, browserWindow) => {
      const [__, pageView] = browserWindow.getBrowserViews();
      toggleDevTools(pageView.webContents);
    },
  },
  {
    label: "Dev Tools (Common)",
    accelerator: "F12",
    click: (_, browserWindow) => {
      const [__, pageView] = browserWindow.getBrowserViews();
      toggleDevTools(pageView.webContents);
    },
    visible: false,
  },
];

module.exports = { initMenu };
