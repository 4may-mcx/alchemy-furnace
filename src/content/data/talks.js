const storageConfig = {
  key: "__V_GPTHELPER",
};

export const defaultData = [
  {
    key: 0,
    title: "注释补全",
    describe: "完善代码的所有注释",
  },
  {
    key: 1,
    title: "代码优化",
    describe: "优化代码的逻辑以及变量名称，并在修改的地方加以注释",
  },
  {
    key: 2,
    title: "vitest单测",
    describe: "使用vitest编写对应的单元测试，需要考虑所有的边缘条件并加以注释",
  },
];

const setData = (data) => {
  localStorage.setItem(storageConfig.key, JSON.stringify(data));
};

export const getData = () => {
  const data = localStorage.getItem(storageConfig.key);
  if (!data) {
    setData(defaultData);
    return defaultData;
  }
  return JSON.parse(data);
};

export const getTalkTemplate = (keys) => {
  let base = `根据以下需求，完善代码同时以代码块的形式输出 \n`;
  const data = getData();
  keys.forEach((key, index) => {
    base += `${index + 1}. ${data[key].describe}\n`;
  });
  return base;
};

export const addData = (newData) => {
  const rawData = localStorage.getItem(storageConfig.key);
  // 如果本地没有任何数据
  if (!rawData) {
    setData([{ key: 0, ...newData }]);
    return;
  }
  const orginData = JSON.parse(rawData);
  for (const config of orginData) {
    if (config.title === newData.title) {
      return false;
    }
  }
  setData([...orginData, { key: orginData.length, ...newData }]);
  return true;
};

export const editConfig = (key, title, describe) => {
  if (!title || !describe) {
    console.error("title or describe is not found");
    return;
  }
  const rawData = getData();
  const target = rawData[key];
  target.title = title;
  target.describe = describe;
  setData(rawData);
};

export const delConfig = (keys) => {
  if (!keys.length) return;
  const rawData = getData();
  const newData = rawData
    .filter((item) => !keys.includes(item.key))
    .map((item, index) => ({ ...item, key: index }));
  setData(newData);
};

export const exportConfig = (filename) => {
  const rawData = localStorage.getItem(storageConfig.key);
  const blob = new Blob([rawData], { type: "text/json" });
  const a = document.createElement("a");

  a.download = filename.endsWith(".json") ? filename : filename + ".json";
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  a.dispatchEvent(new MouseEvent("click"));
};

export const importConfig = () => {
  console.log("导入文件");
};
