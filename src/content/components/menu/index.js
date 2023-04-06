import { Button, Input } from "antd";
import CheckList from "../check-list";
import classNames from "./index.module.scss";
import { useCallback, useState } from "react";
import { loadValue, addValue } from "./util";

const Menu = ({ visiable }) => {
  const [inputValue, setInputValue] = useState("aaa");

  const handleValueChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleClearValue = useCallback(() => {
    setInputValue("");
  }, []);

  const handleFillValue = useCallback(() => {
    loadValue(inputValue);
  }, [inputValue]);

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
        <CheckList />
      </div>

      <div className={classNames.btns}>
        <Button>导出</Button>
        <Button>导入</Button>
        <Button onClick={handleClearValue}>清空</Button>
        <Button onClick={handleFillValue}>填入</Button>
        <Button onClick={handleAddValue}>追加</Button>
      </div>
    </div>
  );
};

export default Menu;
