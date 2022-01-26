const initTabs = async () => {
  await window.request_main.getCurrentTabs();
};

window.on_header.responseAllTabs((_, { tabs, activeIdx }) => {
  tabs = tabs.map((tab) => JSON.parse(tab));
  resetAllTabs(tabs, activeIdx);
});

// event delegation
document
  .getElementById("tab-area-container")
  .addEventListener("click", async (e) => {
    console.log(e.target);
    if (e.target.className === "tab-close-btn") {
      const tab = e.target.parentElement.parentElement.parentElement;
      await window.request_main.deleteTabById(tab.id);
      tab.remove();
    }
  });

initTabs();

// utils
const resetAllTabs = (tabsData, activeTabIdx) => {
  const tabs = document.getElementById("tabs");

  tabsData.forEach((tabData, idx) =>
    createNewTab(tabData, idx === activeTabIdx, tabs)
  );
};

const createNewTab = ({ id, title }, isActive, tabs) => {
  const tab = createElement("div", "tab", id);
  const _tabContainer = createElement("div", "tab-container");
  const __tabFavicon = createNewTabSVG();
  const __tabTitle = createElement("span", "tab-title");
  const __tabClose = createCloseTabBtn();
  const _tabBorderRight = createElement("div", "tab-border-right");

  if (isActive) tab.classList.add("focused-tab");

  __tabTitle.innerHTML = title;

  _tabContainer.appendChild(__tabFavicon);
  _tabContainer.appendChild(__tabTitle);
  _tabContainer.appendChild(__tabClose);

  tab.appendChild(_tabContainer);
  tab.appendChild(_tabBorderRight);

  tabs.appendChild(tab);
};

const createElement = (elementType, className, id) => {
  const element = document.createElement(elementType);
  if (className) element.className = className;
  if (id) element.id = id;
  return element;
};

const createNewTabSVG = () => {
  const tabFavicon = createElement("div", "tab-favicon");
  const _tabFaviconSVG = createElement("object");

  _tabFaviconSVG.data = "icons/new-tab-fav.svg";

  tabFavicon.appendChild(_tabFaviconSVG);

  return tabFavicon;
};

const createCloseTabBtn = () => {
  const tabClose = createElement("div", "tab-close");
  const _tabCloseBtn = createElement("div", "tab-close-btn");
  const __tabCloseBtnSVG = createElement("object");

  __tabCloseBtnSVG.data = "icons/tab-close-btn.svg";

  _tabCloseBtn.appendChild(__tabCloseBtnSVG);
  tabClose.appendChild(_tabCloseBtn);

  return tabClose;
};
