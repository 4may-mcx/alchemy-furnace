const getTarget = () => {
  const textAreas = document.getElementsByTagName("textarea");
  const url = window.location.href;

  if (url.indexOf('url === "https://openai.zhenguanyu.com/"')) {
    return textAreas[0];
  } else if (url.indexOf("https://chat.openai.com/chat")) {
    return textAreas[0];
  }
  return null;
};

export const loadValue = (value) => {
  getTarget().value = value;
};
export const addValue = (value) => {
  getTarget().value += value;
};
