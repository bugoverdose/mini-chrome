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

listen_on.readAllFavorites((_, { data }) => {
  const favorites = JSON.parse(data);
  console.log(favorites);
});

init();
