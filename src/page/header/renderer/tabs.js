const {
  custom_events: { red: closeWindow },
  custom_utils: {
    setFocusTabByTabId,
    resetAllTabs,
    createElement,
    createNewTabElement,
    cleanseTabFocus,
    updateTabState,
  },
  constants: { NEW_TAB_FAVICON, DEFAULT_FAVICON, CONNECTION_FAIL_FAVICON },
  request_main: {
    getCurrentTabs,
    createNewTab,
    toggleFocusTabById,
    deleteTabById,
  },
} = window;

const omnibox2 = document.getElementById("omnibox");
const focusOnOmniboxIfNewTab = () => {
  if (!omnibox2.value || omnibox2.value === "") {
    omnibox2.focus(); // omnibox2.select();
  } else {
    omnibox2.blur();
  }
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

  if (target.classList.contains("tab-container")) {
    triggerFocusTabIfUnfocused(target.parentElement);
  }
  if (target.classList.contains("tab-favicon")) {
    triggerFocusTabIfUnfocused(target.parentElement.parentElement);
  }

  if (target.classList.contains("tab-close-btn")) triggerTabClose(target);
});

const triggerCreateNewTab = () => {
  setIsLoading(true);
  createNewTab();
};

const triggerFocusTabIfUnfocused = (targetTab) => {
  if (targetTab.classList.contains("focused-tab")) return;
  triggerFocusTabToggle(targetTab.id);
};

const triggerFocusTabToggle = (tabId) => {
  toggleFocusTabById(tabId);
  setFocusTabByTabId(tabId);
};

const triggerTabClose = async (target) => {
  const tab = target.parentElement.parentElement.parentElement;

  if (!tab.classList.contains("tab")) {
    throw new Error("document structure exception on tab-close-btn div");
  }
  const isFocusTab = tab.classList.contains("focused-tab");
  let focusTabId = tab.id;

  if (isFocusTab) {
    const allTabs = document.querySelectorAll(".tab");

    if (allTabs.length <= 1) return closeWindow();

    focusTabId = findNextFocusTabId(allTabs, tab);
    triggerFocusTabToggle(focusTabId);
  }

  tab.remove();

  await deleteTabById(tab.id, focusTabId);
};

const findNextFocusTabId = (allTabs, curFocusTab) => {
  let focusTabIdx = -1;

  for (let tabIdx = 0; tabIdx < allTabs.length; tabIdx++) {
    if (allTabs[tabIdx] === curFocusTab) {
      focusTabIdx = tabIdx;
      break;
    }
  }

  if (focusTabIdx === allTabs.length - 1) {
    focusTabIdx--; // 마지막 탭이 없어질 예정이라면 왼쪽을 타겟으로.
  } else {
    focusTabIdx++; // 현재 없어질 탭의 오른쪽을 타겟으로.
  }

  return allTabs[focusTabIdx].id;
};

// listen on requests from main process (window.listen_on)
listen_on.renderAllTabs((_, { tabs, focusTabId }) => {
  resetAllTabs(JSON.parse(tabs), focusTabId);

  setIsLoading(false);
});

listen_on.renderNewTab(async (_, { tab, focusTabId }) => {
  tab = JSON.parse(tab);
  const tabs = document.getElementById("tabs");
  await createNewTabElement(tab, focusTabId, tabs);
  cleanseTabFocus(focusTabId);

  setIsLoading(false);
});

listen_on.updateTabInfo((_, tabData) => {
  if (tabData.length === 0) return;
  const {
    id: tabId,
    title,
    favicon,
    omnibox,
    url,
    canGoBack,
    canGoForward,
    pageLoading,
  } = JSON.parse(tabData);
  const tab = document.getElementById(tabId);

  if (!tab) return; // 아직 생성되지 않은 탭을 업데이트하려는 경우 (탭 생성시에도 트리거되기 때문)

  tab.getElementsByClassName("tab-title")[0].innerText = title;

  const curFavObject = tab.querySelector(".tab-favicon object");

  if (!curFavObject.data.endsWith(favicon)) {
    updateFavicon(tab, curFavObject, favicon);
  }
  cleanseFavicons(tab);

  if (tab.classList.contains("focused-tab")) {
    updateTabState(canGoBack, canGoForward, pageLoading, omnibox);
  }

  focusOnOmniboxIfNewTab();
});

const updateFavicon = (tab, curFavObject, favicon) => {
  if (favicon === NEW_TAB_FAVICON) {
    curFavObject.data = NEW_TAB_FAVICON; // 뒤로 가기로 새 탭 창으로 되돌아가는 경우
    return;
  }

  if (favicon === CONNECTION_FAIL_FAVICON) {
    curFavObject.data = CONNECTION_FAIL_FAVICON;
    return;
  }

  const favContainer = tab.querySelector(".tab-favicon");

  const newFavObject = createElement("object");
  newFavObject.data = favicon;

  // exception handling
  newFavObject.addEventListener(
    "error",
    (e) => {
      const defaultFavObject = createElement("object");
      defaultFavObject.data = DEFAULT_FAVICON;

      newFavObject.remove();
      favContainer.appendChild(defaultFavObject);
    },
    { once: true }
  );

  curFavObject.remove();
  favContainer.appendChild(newFavObject);
};

const cleanseFavicons = (tab) => {
  const favObjects = tab.querySelectorAll(".tab-favicon object");
  for (let idx = 1; idx < favObjects.length; idx++) {
    favObjects[idx].remove(); // remove(): 화면에서 제거. 코드상으로는 배열 내에 그대로 존재
  }
};

// init
const initTabs = async () => {
  await getCurrentTabs();
};

initTabs();
