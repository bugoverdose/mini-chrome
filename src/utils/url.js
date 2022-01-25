const { topDomainList } = require("../data");

// url should be all lowercase
const isValidUrl = (url) => {
  if (url.startWith("https://")) return true;
  if (url.startWith("http://")) return true;
  return false;
};

const isGoogleSearch = (url) => {
  if (!url.includes(".")) return true;

  for (let idx = 0; idx < topDomainList.length; idx++) {
    if (url.endsWith(`.${topDomainList[idx]}`)) return false;
  }

  return true;
};

const toValidURL = (url) => {
  return `https://${url}`;
};

const toGoogleSearchURL = (searchKeyword) => {
  return `https://www.google.com/search?q=${searchKeyword}`;
};
