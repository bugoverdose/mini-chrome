document.getElementById("omnibox").addEventListener("keydown", async (e) => {
  const { target, key } = e;
  if (key === "Enter") {
    const focusedTab = document.getElementsByClassName("focused-tab")[0];
    await window.request_main.loadURL(target.value, focusedTab.id);
  }
});
