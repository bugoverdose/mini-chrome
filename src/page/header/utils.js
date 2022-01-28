const pageRefreshIcon = "icons/refresh-btn.svg";
const pageStopLoadIcon = "icons/stop-load-btn.svg";

const checkPageLoading = (icon) => {
  return icon.data.endsWith(pageStopLoadIcon); // 직접 읽으면 file://~ 형식
};

const setRefreshIcon = (icon) => {
  icon.data = pageRefreshIcon;
};

const setPageStopLoadingIcon = (icon) => {
  icon.data = pageStopLoadIcon;
};

const updateTabState = (canGoBack, canGoForward, pageLoading, url) => {
  const goBack = document.getElementById("go-back");
  const goForward = document.getElementById("go-forward");
  const refreshOrStop = document.querySelector("#refresh-or-stop object");
  const omnibox = document.getElementById("omnibox");

  canGoBack
    ? goBack.classList.remove("view-util-deactivate")
    : goBack.classList.add("view-util-deactivate");

  canGoForward
    ? goForward.classList.remove("view-util-deactivate")
    : goForward.classList.add("view-util-deactivate");

  pageLoading
    ? setPageStopLoadingIcon(refreshOrStop)
    : setRefreshIcon(refreshOrStop);

  omnibox.value = url;
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
    createNewTabElement(tabData, idx === focusTabIdx, tabs)
  );
};

const createNewTabElement = (
  { id, title, idx, url, canGoBack, canGoForward, pageLoading },
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
    updateTabState(canGoBack, canGoForward, pageLoading, url);
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
  checkPageLoading,
  setRefreshIcon,
  setPageStopLoadingIcon,
  updateTabState,
  cleanseTabFocus,
  setFocusTabByTabId,
  resetAllTabs,
  createNewTabElement,
};
