document.getElementById("omnibox").addEventListener("keydown", async (e) => {
  const { target, key } = e;
  if (key === "Enter") {
    const focusedTab = document.getElementsByClassName("focused-tab")[0];
    await window.custom_events.loadURL(target.value, focusedTab.id);
  }
});

// document.getElementById("omnibox").addEventListener("input", (e) => {
//   console.log(e.target.value);
// });
