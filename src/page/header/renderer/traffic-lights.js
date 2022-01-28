const {
  custom_events: { red, yellow, green },
} = window;

document.getElementById("red").addEventListener("click", async (e) => {
  await red();
});

document.getElementById("yellow").addEventListener("click", async (e) => {
  await yellow();
});

document.getElementById("green").addEventListener("click", async (e) => {
  await green();
});
