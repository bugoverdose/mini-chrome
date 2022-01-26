const initTabs = async () => {
  await window.request_main.getCurrentTabs();
};

window.listen_on.response_allTabs((_, { tabs, activeIdx }) => {
  tabs = tabs.map((tab) => JSON.parse(tab));
  console.log(tabs);
  console.log(activeIdx);
});

initTabs();
