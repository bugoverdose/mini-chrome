// traffic lights
document.getElementById("red").addEventListener("click", async (e) => {
  await window.custom_events.red();
});

document.getElementById("yellow").addEventListener("click", async (e) => {
  await window.custom_events.yellow();
});

document.getElementById("green").addEventListener("click", async (e) => {
  await window.custom_events.green();
});

// omnibox
// document.getElementById("omnibox").addEventListener("input", (e) => {
//   console.log(e.target.value);
// });
