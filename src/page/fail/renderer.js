const search = decodeURI(window.location.search);
const hash = window.location.hash;

const inputValue = search.substring(1, search.length);
const errCode = hash.substring(1, hash.length);

document.getElementById("omnibox-input").innerText = `${inputValue}`;
document.getElementById("error-code").innerText = `${errCode}`;
