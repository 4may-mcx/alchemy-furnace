import { Button, Input, Space, Modal, Popover } from "antd";
import CheckList from "../check-list";
import classNames from "./index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { loadValue, addValue } from "./util";
import {
  getData,
  addData,
  exportData,
  getTalkTemplate,
} from "../../data/talks";

const Menu = ({ visiable }) => {
  const [list, setList] = useState(getData());
  const [inputValue, setInputValue] = useState("");
  const [targetKeys, setTargetKeys] = useState([]);
  const [keysText, setKeysText] = useState("");
  const [editorVisiable, setEditorVisiable] = useState(false);
  const [text, setText] = useState("");

  const [newConfigTitle, setNewConfigTitle] = useState("");
  const [newConfigDesc, setNewConfigDesc] = useState("");
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

  const importConf = useCallback(() => {
    console.log("导入配置");
  }, []);

  const handleClearValue = useCallback(() => {
    setTargetKeys([]);
    setInputValue("");
  }, []);

  const handleNewConfReset = useCallback(() => {
    setNewConfigTitle("");
    setNewConfigDesc("");
  }, []);

  const addConf = useCallback(() => {
    addData({
      title: newConfigTitle,
      describe: newConfigDesc,
    });
    setList(getData());
    handleNewConfReset();
  }, [newConfigTitle, newConfigDesc, handleNewConfReset]);

  const popOverContent = (
    <div style={{ width: "200px" }}>
      <Input
        style={{ marginBottom: "5px" }}
        placeholder="enter title"
        value={newConfigTitle}
        onChange={(e) => setNewConfigTitle(e.target.value)}
      />
      <Input
        style={{ marginBottom: "10px" }}
        placeholder="enter describe"
        value={newConfigDesc}
        onChange={(e) => setNewConfigDesc(e.target.value)}
      />
      <Button
        type="primary"
        size="small"
        style={{ marginRight: "8px" }}
        onClick={addConf}
      >
        确认
      </Button>
      <Button size="small" onClick={handleNewConfReset}>
        重置
      </Button>
    </div>
  );

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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="primary" onClick={() => setEditorVisiable(true)}>
            展开
          </Button>
        </Space.Compact>

        <div className={classNames[`RC-check-list`]}>
          <CheckList
            handleKeyChange={handleKeyChange}
            targetKeys={targetKeys}
            list={list}
          />
        </div>

        <div className={classNames.btns}>
          <Popover content={popOverContent} trigger="click" placement="left">
            <Button>新增</Button>
          </Popover>

          <Button onClick={exportData}>导出</Button>
          <Button onClick={importConf}>导入</Button>
          <Button onClick={() => loadValue(text)} type="primary" ghost>
            填入
          </Button>
          <Button onClick={() => addValue(text)} type="primary" ghost>
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
