const { Menu, MenuItem } = require("electron");
const { toggleDevTools } = require("../utils/shortcut");

const initMenu = () => {
  const menu = new Menu();

  const isMac = process.platform === "darwin";

  menu.append(
    new MenuItem({
      label: "Mini Chrome",
      submenu: [
        {
          label: "Dev Tools (F12)",
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
      ],
    })
  );

  Menu.setApplicationMenu(menu);
};

module.exports = { initMenu };

// const configShortcuts = (window, browserView) => {
//   const { webContents } = browserView;
//   const headerView = window.getHeaderView();
//   const windowId = window.getId();
//   const isMac = process.platform === "darwin";

//   webContents.on("before-input-event", (event, input) => {
//     // 디폴트로 등록된 기능들은 일단은 그대로 사용.
//     if (input.isAutoRepeat) return; // 계속 누르고 있는 경우 첫번째만 실행되고 나머지는 무시
//     if (input.type === "keyUp") return; // 처음 누를 때만 인식하고 땔 때는 무시하도록

//     if (isCloseTabCommand(input, isMac)) {
//       return closeFocusTab(headerView, windowId);
//     }
//     if (isToggleDevToolsCommand(input, isMac)) {
//       return toggleDevTools(webContents);
//     }
//   });
// };
