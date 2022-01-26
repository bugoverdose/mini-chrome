document.getElementById("omnibox").addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await window.custom_events.loadURL(e.target.value);
  }
});

// document.getElementById("omnibox").addEventListener("input", (e) => {
//   console.log(e.target.value);
// });
