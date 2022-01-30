const { FAILED_PAGE_HTML_FILE_ROUTE } = require("../constants");
const { topDomainList } = require("./tdl");

const decodeFailedToLoadURL = (loadedFile) => {
  return decodeURI(loadedFile)
    .replace(`${FAILED_PAGE_HTML_FILE_ROUTE}`, "")
    .replace(`?`, "")
    .split("#")[0];
  // 연결 실패한 직후에는 시도했던 검색어를 그대로 url로 지님.
  // 다만, loadFile 후부터는 다음과 같은 구조를 지니게 됨. file:///Users/jeong/mini-chrome/src/page/fail/index.html?asd.asd.com#ERR_NAME_NOT_RESOLVED
};

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
  if (url.includes(" ")) return true;
  if (url.length <= 3) return true; // a.co == 4글자
  if (url.startsWith(".")) return true;

  for (let idx = 0; idx < topDomainList.length; idx++) {
    if (url.includes(topDomainList[idx])) {
      if (url.endsWith(`.${topDomainList[idx]}`)) return false;
      if (url.includes(`.${topDomainList[idx]}/`)) return false;
      if (url.includes(`.${topDomainList[idx]}?`)) return false;
      if (url.includes(`.${topDomainList[idx]}#`)) return false;
    }
  }

  return true;
};

const toValidURL = (url) => {
  return `http://${url}`;
};

const toGoogleSearchURL = (searchKeyword) => {
  return `https://www.google.com/search?q=${searchKeyword}`;
};

module.exports = { inputToValidUrl, decodeFailedToLoadURL };
