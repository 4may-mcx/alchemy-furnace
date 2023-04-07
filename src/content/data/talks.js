export const talksData = [
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
    base += `${count++}. ${talksData[key].describe}\n`;
  }
  return base;
};
