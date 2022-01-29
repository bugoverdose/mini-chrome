const electron = require("electron");
const path = require("path");
const fs = require("fs");

class Database {
  constructor() {
    const userDataPath = electron.app.getPath("userData");
    // app.getPath('userData') will return a string of the user's app data directory path.

    this.path = path.join(userDataPath, "mini-chrome-data.json");
    this.data = getDataFile(this.path);
  }

  get(key) {
    return this.data[key]; // cache
  }

  addFavorite(title, url) {
    const favoritesList = this.data["favorite"];
    favoritesList.push({ title, url });

    set("favorite", favoritesList);
  }

  set(key, updatedData) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(updatedData)); // update database
      this.data[key] = updatedData; // update cache
      return { ok: true, data: this.data, error: null };
    } catch (error) {
      return { ok: false, data: null, error };
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

const getDataFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return initialDatabase;
  }
};

const database = new Database();

module.exports = { database };
