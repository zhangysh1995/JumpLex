 const DICTIONARIES = [
  {
    id: 'Takoboto',
    name: "Takoboto: %s",
    url: "https://takoboto.jp/?q="
  },
  {
    id: "merriam_webster",
    name: "韦氏词典: %s",
    url: "https://www.merriam-webster.com/dictionary/"
  },
  {
    id: "cambridge",
    name: "剑桥词典: %s",
    url: "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/"
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

  let url = `${dict.url}`;

  let selected = info.selectionText;
  let query = selected;
  if (!selected) return;

  const words = query.split(" ");
  if (dict.id == 'cambridge') {
    if (words.length > 1) {
      // a phrase is selected, e.g. 'take off' => 'take-off'
      query = words.join('-');
    }
  } 

  if (dict.id != 'cambridge') {
    query = encodeURIComponent(query.trim());
  }

  url = `${url}${query}`;
  // TODO: When using cambridge dict, this redirects the user to
  // main page for non-existing words. We may want to handle
  // it in the future. 
  chrome.tabs.create({ url });
});