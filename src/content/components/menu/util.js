const pageConfig = [
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

  for (const config of pageConfig) {
    if (url.indexOf(config.url) > -1) {
      console.log("active pageConfig: ", config);
      return textAreas[config.textAreaIndex];
    }
  }
  return null;
};

export const isTargetPage = () => {
  return !!getTarget();
};

export const loadValue = (value) => {
  const target = getTarget();
  if (target.value !== null) {
    target.value = value;
  }
};
export const addValue = (value) => {
  const target = getTarget();
  if (target.value !== null) {
    target.value += value;
  }
};
