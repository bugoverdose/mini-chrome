const { Menu, MenuItem } = require("electron");

const initMenu = () => {
  const menu = new Menu();

  menu.append(
    new MenuItem({
      label: "Electron",
      submenu: [
        {
          role: "help",
          accelerator: process.platform === "darwin" ? "I" : "Alt+Shift+I",
          click: () => {
            console.log("Electron rocks!");
          },
        },
      ],
    })
  );

  Menu.setApplicationMenu(menu);
};

module.exports = { initMenu };
