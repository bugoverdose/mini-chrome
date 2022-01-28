const {
  custom_utils: {
    setFocusTabByTabId,
    resetAllTabs,
    createNewTabElement,
    cleanseTabFocus,
    updateTabState,
  },
  request_main: {
    getCurrentTabs,
    createNewTab,
    toggleFocusTabById,
    deleteTabById,
  },
  listen_on: { renderAllTabs, renderNewTab, updateTabInfo },
} = window;

const initTabs = async () => {
  await getCurrentTabs();
};

const tabArea = document.getElementById("tab-area-container");

const isLoading = () => tabArea.classList.contains("loading");
const setIsLoading = (isLoading) => {
  isLoading
    ? tabArea.classList.add("loading")
    : tabArea.classList.remove("loading");
};

// event delegation
tabArea.addEventListener("click", (e) => {
  const { target } = e;

  if (isLoading()) return;

  if (target.id === "tab-create-btn") triggerCreateNewTab();
  if (target.classList.contains("tab-container")) triggerFocusTabToggle(target);
  if (target.classList.contains("tab-close-btn")) triggerTabClose(target);
});

const triggerCreateNewTab = () => {
  setIsLoading(true);
  createNewTab();
};

const triggerFocusTabToggle = (target) => {
  const tabId = target.parentElement.id;

  toggleFocusTabById(tabId);
  setFocusTabByTabId(tabId);
};

const triggerTabClose = async (target) => {
  const tab = target.parentElement.parentElement.parentElement;
  if (!tab.classList.contains("tab")) {
    throw new Error("document structure exception on tab-close-btn div");
  }

  await deleteTabById(tab.id);
  tab.remove();
};

// listen on requests from main process
renderAllTabs((_, { tabs, focusIdx }) => {
  tabs = tabs.map((tab) => JSON.parse(tab));
  resetAllTabs(tabs, focusIdx);

  setIsLoading(false);
});

renderNewTab((_, { tab, focusIdx }) => {
  tab = JSON.parse(tab);
  const tabs = document.getElementById("tabs");
  createNewTabElement(tab, tab.idx === focusIdx, tabs);
  cleanseTabFocus(focusIdx);

  setIsLoading(false);
});

updateTabInfo((_, tabData) => {
  const {
    id: tabId,
    title,
    idx,
    url,
    canGoBack,
    canGoForward,
    pageLoading,
  } = JSON.parse(tabData);
  const tab = document.getElementById(tabId);

  if (!tab) return; // 아직 생성되지 않은 탭을 업데이트하려는 경우 (탭 생성시에도 트리거되기 때문)

  tab.getElementsByClassName("tab-title")[0].innerText = title;

  if (tab.classList.contains("focused-tab")) {
    updateTabState(canGoBack, canGoForward, pageLoading, url);
  }
});

initTabs();
