const {
  request_main: {
    getAllFavorites,
    navToFavorite,
    createFavorite,
    updateFavorite,
    deleteFavorite,
  },
} = window;

const init = () => getAllFavorites();

const favUlElement = document.querySelector("ul");

listen_on.readAllFavorites((_, { data }) => {
  const favorites = JSON.parse(data);
  favorites.forEach((favData) => appendNewFavElement(favData));
});

const appendNewFavElement = (favData) => {
  const { title, url, favicon } = favData;

  const listContainer = document.createElement("li");
  const _anchor = document.createElement("a");
  const __favicon = document.createElement("img");
  const __title = document.createElement("span");

  _anchor.href = url;
  __favicon.src = favicon;
  __title.innerHTML = title;

  _anchor.appendChild(__favicon);
  _anchor.appendChild(__title);
  listContainer.appendChild(_anchor);
  favUlElement.appendChild(listContainer);
};

init();
