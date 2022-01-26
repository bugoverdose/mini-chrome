const initTabs = async () => {
  await window.request_main.getCurrentTabs();
};

window.listen_on.response_allTabs((_, { tabs, activeIdx }) => {
  tabs = tabs.map((tab) => JSON.parse(tab));
  resetAllTabs(tabs, activeIdx);
});

initTabs();

// utils
const resetAllTabs = (tabsData, activeTabIdx) => {
  const tabs = document.getElementById("tabs");

  tabsData.forEach((tabData, idx) => {
    const tab = createNewTab(tabData, idx === activeTabIdx);
    tabs.appendChild(tab);
  });
};

const createNewTab = ({ id, title }, isActive) => {
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

  return tab;
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
