document.getElementById("red").addEventListener("click", async (e) => {
  await window.custom_events.red();
});

document.getElementById("yellow").addEventListener("click", async (e) => {
  await window.custom_events.yellow();
});

document.getElementById("green").addEventListener("click", async (e) => {
  await window.custom_events.green();
});
