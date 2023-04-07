import { Button, Input, Space, Modal } from "antd";
import CheckList from "../check-list";
import classNames from "./index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { loadValue, addValue } from "./util";
import { getTalkTemplate } from "../../data/talks";

const Menu = ({ visiable }) => {
  const [inputValue, setInputValue] = useState("aaa");
  const [targetKeys, setTargetKeys] = useState([]);
  const [keysText, setKeysText] = useState("");
  const [editorVisiable, setEditorVisiable] = useState(false);
  const [text, setText] = useState("");
  const handleKeyChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    setKeysText(getTalkTemplate(targetKeys));
  }, [targetKeys]);

  useEffect(() => {
    const text = `${keysText}\n\`\`\`${inputValue}\`\`\``;
    setText(text);
  }, [keysText, inputValue]);

  const exportConf = useCallback(() => {
    console.log(keysText);
  }, [keysText]);

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
    loadValue(text);
  }, [text]);

  const handleAddValue = useCallback(() => {
    addValue(text);
  }, [text]);

  return (
    <>
      <div
        className={classNames[`RC-menu-container`]}
        style={{ display: visiable ? "block" : "none" }}
      >
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="输入要发送的内容"
            value={inputValue}
            onChange={handleValueChange}
          />
          <Button type="primary" onClick={() => setEditorVisiable(true)}>
            展开
          </Button>
        </Space.Compact>

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
      <Modal
        open={editorVisiable}
        onCancel={() => setEditorVisiable(false)}
        zIndex={9999}
        footer={[]}
      >
        <textarea
          cols="50"
          rows="30"
          value={text}
          onChange={handleTextChange}
        ></textarea>
      </Modal>
    </>
  );
};

export default Menu;
