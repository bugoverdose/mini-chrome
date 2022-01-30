const omnibox = document.getElementById("omnibox");
const refreshOrStopIcon2 = document.querySelector("#refresh-or-stop object");

const {
  request_main: { loadURL, mutateFavorite },
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

const favoriteBtn = document.querySelector("#fav-toggle");

const favIsLoading = () => favoriteBtn.classList.contains("loading");
const setFavIsLoading = (isLoading) => {
  isLoading
    ? favoriteBtn.classList.add("loading")
    : favoriteBtn.classList.remove("loading");
};

const favoriteIcon = favoriteBtn.querySelector("svg");
const checkIsFav = () => favoriteIcon.classList.contains("is-fav");

favoriteBtn.addEventListener("click", async (e) => {
  if (favIsLoading()) return;
  setFavIsLoading(true);

  toggleIsFavorite(checkIsFav());
});

const toggleIsFavorite = (isFavCurrent) => {
  const toggledFav = !isFavCurrent;
  const focusTabId = document.querySelector(".focused-tab").id;

  mutateFavorite({
    focusTabId,
    action: toggledFav ? "create" : "delete",
  });
};

listen_on.toggleIsFavorite((_, { isFav, focusTabId }) => {
  const curFocusTab = document.querySelector(".focused-tab");

  // 응답이 오는 사이에 focus tab이 아니게 되는 경우 고려
  if (curFocusTab.id === focusTabId) {
    isFav
      ? favoriteIcon.classList.add("is-fav")
      : favoriteIcon.classList.remove("is-fav");
  }

  setFavIsLoading(false);
});
