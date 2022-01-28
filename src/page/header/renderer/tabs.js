const initTabs = async () => {
  await window.request_main.getCurrentTabs();
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
  window.request_main.createNewTab();
};

const triggerFocusTabToggle = (target) => {
  const tabId = target.parentElement.id;

  window.request_main.toggleFocusTabById(tabId);
  window.custom_utils.setFocusTabByTabId(tabId);
};

const triggerTabClose = async (target) => {
  const tab = target.parentElement.parentElement.parentElement;
  if (!tab.classList.contains("tab")) {
    throw new Error("document structure exception on tab-close-btn div");
  }

  await window.request_main.deleteTabById(tab.id);
  tab.remove();
};

// listen on requests from main process
window.listen_on.renderAllTabs((_, { tabs, focusIdx }) => {
  tabs = tabs.map((tab) => JSON.parse(tab));
  window.custom_utils.resetAllTabs(tabs, focusIdx);

  setIsLoading(false);
});

window.listen_on.renderNewTab((_, { tab, focusIdx }) => {
  tab = JSON.parse(tab);
  const tabs = document.getElementById("tabs");
  window.custom_utils.createNewTab(tab, tab.idx === focusIdx, tabs);
  window.custom_utils.cleanseTabFocus(focusIdx);

  setIsLoading(false);
});

window.listen_on.updateTabInfo((_, tabData) => {
  const {
    id: tabId,
    title,
    idx,
    url,
    canGoBack,
    canGoForward,
  } = JSON.parse(tabData);
  const tab = document.getElementById(tabId);
  if (!tab) return; // 아직 생성되지 않은 탭을 업데이트하려는 경우 (탭 생성시에도 트리거되기 때문)

  tab.getElementsByClassName("tab-title")[0].innerText = title;

  if (tab.classList.contains("focused-tab")) {
    window.custom_utils.updateViewUtils(canGoBack, canGoForward);
  }
});

initTabs();
