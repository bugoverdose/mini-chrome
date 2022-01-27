const initTabs = async () => {
  await window.request_main.getCurrentTabs();
};

window.listen_on.renderAllTabs((_, { tabs, activeIdx }) => {
  tabs = tabs.map((tab) => JSON.parse(tab));
  resetAllTabs(tabs, activeIdx);
});

window.listen_on.renderNewTab((_, { tab, activeIdx }) => {
  console.log(tab);
  tab = JSON.parse(tab);
  const tabs = document.getElementById("tabs");
  createNewTab(tab, tab.idx === activeIdx, tabs);
});

// event delegation
document.getElementById("tab-area-container").addEventListener("click", (e) => {
  const { target } = e;
  console.log(target);

  if (target.className === "tab-close-btn") triggerTabClose(target);
  if (target.id === "tab-create-btn") triggerCreateNewTab();
});

const triggerTabClose = async (target) => {
  const tab = target.parentElement.parentElement.parentElement;
  if (!tab.classList.contains("tab")) {
    throw new Error("document structure exception on tab-close-btn div");
  }
  await window.request_main.deleteTabById(tab.id);
  tab.remove();
};

const triggerCreateNewTab = () => {
  window.request_main.createNewTab();
};

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
