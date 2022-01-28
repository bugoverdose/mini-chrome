// event delegation
const viewUtils = document.getElementById("view-utils-container");
const refreshOrStopIcon = document.querySelector("#refresh-or-stop object");

const {
  custom_events: { initGoBack, initGoForward, initReload, initStopLoad },
  custom_utils: {
    checkPageLoading,
    setPageStopLoadingIcon,
    setPageLoadingIcon,
  },
} = window;

viewUtils.addEventListener("click", (e) => {
  const { target } = e;

  const tab = document.querySelector(".focused-tab");

  if (target.id === "go-back") triggerGoBack(tab.id);
  if (target.id === "go-forward") triggerGoForward(tab.id);
  if (target.id === "refresh-or-stop") triggerRefreshOrStop(tab.id);
});

const triggerGoBack = async (tabId) => {
  await initGoBack(tabId);
};

const triggerGoForward = async (tabId) => {
  await initGoForward(tabId);
};

const triggerRefreshOrStop = (tabId) => {
  console.log(refreshOrStopIcon);
  console.log(checkPageLoading(refreshOrStopIcon));
  if (checkPageLoading(refreshOrStopIcon)) {
    triggerStopLoad(tabId);
    return;
  }
  triggerRefresh(tabId);
};

const triggerRefresh = (tabId) => {
  setPageStopLoadingIcon(refreshOrStopIcon);

  initReload(tabId);
};

const triggerStopLoad = async (tabId) => {
  await initStopLoad(tabId);

  setPageLoadingIcon(refreshOrStopIcon);
};
