const updateViewUtils = (canGoBack, canGoForward) => {
  const goBack = document.getElementById("go-back");
  const goForward = document.getElementById("go-forward");

  canGoBack
    ? goBack.classList.remove("view-util-deactivate")
    : goBack.classList.add("view-util-deactivate");

  canGoForward
    ? goForward.classList.remove("view-util-deactivate")
    : goForward.classList.add("view-util-deactivate");
};

const cleanseTabFocus = (focusTabIdx) => {
  const tabList = document.querySelectorAll(".tab");

  tabList.forEach((tab, idx) =>
    idx === focusTabIdx
      ? tab.classList.add("focused-tab")
      : tab.classList.remove("focused-tab")
  );
};

const setFocusTabByTabId = (tabId) => {
  const tabList = document.querySelectorAll(".tab");

  tabList.forEach((tab) =>
    tab.id === tabId
      ? tab.classList.add("focused-tab")
      : tab.classList.remove("focused-tab")
  );
};

const resetAllTabs = (tabsData, focusTabIdx) => {
  const tabs = document.getElementById("tabs");

  tabsData.forEach((tabData, idx) =>
    createNewTab(tabData, idx === focusTabIdx, tabs)
  );
};

const createNewTab = (
  { id, title, idx, url, canGoBack, canGoForward },
  isFocus,
  tabs
) => {
  const tab = createElement("div", "tab", id);
  const _tabContainer = createElement("div", "tab-container");
  const __tabFavicon = createNewTabSVG();
  const __tabTitle = createElement("span", "tab-title");
  const __tabClose = createCloseTabBtn();
  const _tabBorderRight = createElement("div", "tab-border-right");

  if (isFocus) {
    tab.classList.add("focused-tab");
    updateViewUtils(canGoBack, canGoForward);
  }

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

module.exports = {
  updateViewUtils,
  cleanseTabFocus,
  setFocusTabByTabId,
  resetAllTabs,
  createNewTab,
};
