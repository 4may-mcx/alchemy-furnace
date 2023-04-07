import { Button, Input, Space, Modal } from "antd";
import CheckList from "../check-list";
import classNames from "./index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { loadValue, addValue } from "./util";
import { exportData, getTalkTemplate } from "../../data/talks";

const Menu = ({ visiable }) => {
  const [inputValue, setInputValue] = useState("");
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
    exportData();
  }, []);

  const importConf = useCallback(() => {
    console.log("导入配置");
  }, []);

  const handleValueChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleClearValue = useCallback(() => {
    setTargetKeys([]);
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
        style={{ display: visiable ? "flex" : "none" }}
      >
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="enter text or code"
            value={inputValue}
            onChange={handleValueChange}
          />
          <Button type="primary" onClick={() => setEditorVisiable(true)}>
            展开
          </Button>
        </Space.Compact>

        <div className={classNames[`RC-check-list`]}>
          <CheckList
            handleKeyChange={handleKeyChange}
            targetKeys={targetKeys}
          />
        </div>

        <div className={classNames.btns}>
          <Button onClick={exportConf}>导出</Button>
          <Button onClick={importConf}>导入</Button>
          <Button onClick={handleFillValue} type="primary" ghost>
            填入
          </Button>
          <Button onClick={handleAddValue} type="primary" ghost>
            追加
          </Button>
          <Button onClick={handleClearValue} danger>
            清空
          </Button>
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
