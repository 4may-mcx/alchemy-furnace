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

export const getTalkTemplate = (keys) => {
  let base = `根据以下需求，完善代码同时以代码块的形式输出 \n`;
  let count = 1;
  for (const key of keys) {
    base += `${count++}. ${defaultData[key].describe}\n`;
  }
  return base;
};

export const getData = () => {
  const data = localStorage.getItem(storageConfig.key);
  if (!data) {
    localStorage.setItem(storageConfig.key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

export const addData = (newData) => {
  const rawData = localStorage.getItem(storageConfig.key);
  // 如果本地没有任何数据
  if (!rawData) {
    localStorage.setItem(storageConfig.key, JSON.stringify(newData));
    return;
  }
  const orginData = JSON.parse(rawData);
  localStorage.setItem(
    storageConfig.key,
    JSON.stringify([...orginData, ...newData])
  );
};

export const exportData = (filename = "data.json") => {
  const rawData = localStorage.getItem(storageConfig.key);
  const blob = new Blob([rawData], { type: "text/json" });
  const event = new MouseEvent("click");
  const a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  a.dispatchEvent(event);
};

// TODO:
export const importData = () => {};
