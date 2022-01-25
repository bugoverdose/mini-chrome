const { topDomainList } = require("../data");

const inputToValidUrl = (inputValue) => {
  const input = inputValue.toLowerCase();

  if (isValidUrl(input)) return input;
  if (isGoogleSearch(input)) return toGoogleSearchURL(input);

  return toValidURL(input);
};

const isValidUrl = (url) => {
  if (url.startsWith("https://")) return true;
  if (url.startsWith("http://")) return true;
  return false;
};

const isGoogleSearch = (url) => {
  if (!url.includes(".")) return true;

  for (let idx = 0; idx < topDomainList.length; idx++) {
    if (url.endsWith(`.${topDomainList[idx]}`)) return false;
    if (url.includes(`.${topDomainList[idx]}/`)) return false;
    if (url.includes(`.${topDomainList[idx]}?`)) return false;
  }

  return true;
};

const toValidURL = (url) => {
  return `http://${url}`;
};

const toGoogleSearchURL = (searchKeyword) => {
  return `https://www.google.com/search?q=${searchKeyword}`;
};

module.exports = { inputToValidUrl };
