const urlConfig = [
  {
    url: "https://openai.zhenguanyu.com",
    textAreaIndex: 1,
  },
  {
    url: "https://chat.openai.com/chat",
    textAreaIndex: 0,
  },
];

const getTarget = () => {
  const textAreas = document.getElementsByTagName("textarea");
  const url = window.location.href;

  for (const config of urlConfig) {
    if (url.indexOf(config.url) > 0) return textAreas[config.textAreaIndex];
  }
  return null;
};

export const loadValue = (value) => {
  getTarget().value = value;
};
export const addValue = (value) => {
  getTarget().value += value;
};
