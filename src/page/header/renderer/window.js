const {
  custom_events: { headerDoubleClick },
} = window;

const body = document.body;

const omnibox3 = document.getElementById("omnibox");

listen_on.toggleWindowFocus((_, { activate }) => {
  activate
    ? body.classList.remove("blur-mode")
    : body.classList.add("blur-mode");
});

document
  .getElementById("top-container")
  .addEventListener("dblclick", async (e) => {
    if (e.target.id === "top-container") await headerDoubleClick();
  });
