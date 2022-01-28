const omnibox = document.getElementById("omnibox");
const refreshOrStopIcon2 = document.querySelector("#refresh-or-stop object");

const {
  request_main: { loadURL },
  custom_utils: { setPageStopLoadingIcon: setPageStopLoadingIcon2 },
} = window;

omnibox.addEventListener("keydown", async (e) => {
  const { target, key } = e;
  if (key === "Enter") {
    omnibox.blur();
    setPageStopLoadingIcon2(refreshOrStopIcon2);

    const focusedTab = document.getElementsByClassName("focused-tab")[0];
    await loadURL(target.value, focusedTab.id);
  }
});
