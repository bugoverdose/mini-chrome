const electron = require("electron");
const path = require("path");
const fs = require("fs");

class Database {
  constructor() {
    const userDataPath = electron.app.getPath("userData");
    // app.getPath('userData') will return a string of the user's app data directory path.

    this.path = path.join(userDataPath, "mini-chrome-data.json");
    this.data = initializeData(this.path);
    this.updateFavUrlCache();
  }

  get(key) {
    return this.data[key]; // cache
  }

  getAllFavorites() {
    return this.data.favorites;
  }

  updateFavUrlCache() {
    this.favUrls = this.data.favorites.map((favData) => favData.url);
  }

  checkIsFavorite(url) {
    for (let idx = 0; idx < this.favUrls.length; idx++) {
      if (this.favUrls[idx] === url) return true;
    }
    return false;
  }

  addFavorite(title, url, favicon) {
    const favoritesList = this.data.favorites;
    favoritesList.push({ title, url, favicon });

    set("favorites", favoritesList);
  }

  set(key, updatedData) {
    try {
      this.data[key] = updatedData; // update cache
      this.updateFavUrlCache();

      fs.writeFileAsync(this.path, JSON.stringify(updatedData)); // update database (save on local machine)
    } catch (error) {
      //
    }
  }
}

const initialDatabase = {
  favorites: [
    {
      title: "Google",
      url: "https://www.google.com/",
      favicon: "https://www.google.com/favicon.ico",
    },
    {
      title: "Github",
      url: "https://github.com/",
      favicon: "https://github.githubassets.com/favicons/favicon-dark.png",
    },
  ],
};

const initializeData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return initialDatabase;
  }
};

const database = new Database();

module.exports = { database };
