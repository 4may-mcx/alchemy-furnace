import { Button, Input } from "antd";
import CheckList from "../check-list";
import classNames from "./index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { loadValue, addValue } from "./util";
import { getTalkTemplate } from "../../data/talks";

const Menu = ({ visiable }) => {
  const [inputValue, setInputValue] = useState("aaa");
  const [targetKeys, setTargetKeys] = useState([]);
  const [text, setText] = useState("");

  const handleKeyChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  useEffect(() => {
    setText(getTalkTemplate(targetKeys));
  }, [targetKeys]);

  const exportConf = useCallback(() => {
    console.log(text);
  }, [text]);

  const importConf = useCallback(() => {
    console.log("导入配置");
  }, []);

  const handleValueChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleClearValue = useCallback(() => {
    setInputValue("");
  }, []);

  const handleFillValue = useCallback(() => {
    loadValue(`${text}\n\`\`\`${inputValue}\`\`\``);
  }, [text, inputValue]);

  const handleAddValue = useCallback(() => {
    addValue(inputValue);
  }, [inputValue]);

  return (
    <div
      className={classNames[`RC-menu-container`]}
      style={{ display: visiable ? "block" : "none" }}
    >
      <div>
        <Input
          allowClear
          placeholder="输入要发送的内容"
          value={inputValue}
          onChange={handleValueChange}
        />
      </div>

      <div className={classNames[`RC-check-list`]}>
        <CheckList handleKeyChange={handleKeyChange} />
      </div>

      <div className={classNames.btns}>
        <Button onClick={exportConf}>导出</Button>
        <Button onClick={importConf}>导入</Button>
        <Button onClick={handleClearValue}>清空</Button>
        <Button onClick={handleFillValue}>填入</Button>
        <Button onClick={handleAddValue}>追加</Button>
      </div>
    </div>
  );
};

export default Menu;
