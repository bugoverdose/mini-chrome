const initTabs = async () => {
  await window.request_main.getCurrentTabs();
};

window.listen_on.renderAllTabs((_, { tabs, focusIdx }) => {
  tabs = tabs.map((tab) => JSON.parse(tab));
  window.custom_utils.resetAllTabs(tabs, focusIdx);
});

window.listen_on.renderNewTab((_, { tab, focusIdx }) => {
  tab = JSON.parse(tab);
  const tabs = document.getElementById("tabs");
  window.custom_utils.createNewTab(tab, tab.idx === focusIdx, tabs);
  window.custom_utils.cleanseTabFocus(focusIdx);
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

// event delegation
document.getElementById("tab-area-container").addEventListener("click", (e) => {
  const { target } = e;

  if (target.id === "tab-create-btn") triggerCreateNewTab();
  if (target.classList.contains("tab-container")) triggerFocusTabToggle(target);
  if (target.classList.contains("tab-close-btn")) triggerTabClose(target);
});

const triggerCreateNewTab = () => {
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

initTabs();
