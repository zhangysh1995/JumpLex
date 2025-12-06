 const DICTIONARIES = [
  {
    id: 'Takoboto',
    name: "用 Takoboto 查：%s",
    url: "https://takoboto.jp/?q="
  },
  {
    id: "cambridge",
    name: "用 Cambridge 查：%s",
    url: "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/english?q="
  },
  // {
  //   id: "oxford",
  //   name: "用 Oxford 查：%s",
  //   url: "https://www.oxfordlearnersdictionaries.com/definition/english/?q="
  // },
  // {
  //   id: "weblio",
  //   name: "用 Weblio（日语）查：%s",
  //   url: "https://www.weblio.jp/content/"
  // },
  // {
  //   id: "etymonline",
  //   name: "用 Etymonline 查：%s",
  //   url: "https://www.etymonline.com/search?q="
  // }
];


chrome.runtime.onInstalled.addListener(() => {
  DICTIONARIES.forEach(dict => {
    chrome.contextMenus.create({
      id: dict.id,
      title: dict.name,
      contexts: ["selection"]
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const dict = DICTIONARIES.find(d => d.id === info.menuItemId);
  if (!dict) return;

  const selected = info.selectionText;
  if (!selected) return;

  const query = encodeURIComponent(selected.trim());
  const url = `${dict.url}${query}`;

  chrome.tabs.create({ url });
});

chrome.runtime