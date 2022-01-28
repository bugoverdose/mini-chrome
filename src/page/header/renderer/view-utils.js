document.getElementById("go-back").addEventListener("click", async (e) => {
  const tab = document.querySelector(".focused-tab");
  await window.custom_events.initGoBack(tab.id);
});

document.getElementById("go-forward").addEventListener("click", async (e) => {
  const tab = document.querySelector(".focused-tab");
  await window.custom_events.initGoForward(tab.id);
});

// document
//   .getElementById("refresh-or-stop")
//   .addEventListener("click", async (e) => {
//     const tab = document.querySelector(".focused-tab");
//     await window.custom_events.initReload(tab.id);
//   });
