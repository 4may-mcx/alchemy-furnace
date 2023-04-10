import { Button, Input, Space, Modal } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import CheckList from "../check-list";
import SettingModal from "../del-list-modal";
import classNames from "./index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { loadValue, addValue } from "./util";

import { getData, getTalkTemplate } from "../../data/talks";

const Menu = ({ visiable }) => {
  const [list, setList] = useState(getData());
  const [inputValue, setInputValue] = useState("");
  const [targetKeys, setTargetKeys] = useState([]);
  const [keysText, setKeysText] = useState("");
  const [editorVisiable, setEditorVisiable] = useState(false);
  const [text, setText] = useState("");
  const [settingModalVisiable, setSettingModalVisiable] = useState(false);

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

  const handleClearValue = useCallback(() => {
    setTargetKeys([]);
    setInputValue("");
  }, []);

  return (
    <>
      <div
        className={classNames[`RC-menu-container`]}
        style={{ display: visiable ? "flex" : "none" }}
      >
        <div className={classNames["RC-setting-container"]}>
          <SettingOutlined
            title="设置面板"
            style={{ cursor: "pointer" }}
            onClick={() => setSettingModalVisiable(true)}
          />
        </div>
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
          <Button
            title="将模版填入输入框"
            onClick={() => loadValue(text)}
            type="primary"
            ghost
          >
            填入
          </Button>
          <Button
            title="将模版追加在输入框已有的内容之后"
            onClick={() => addValue(text)}
            type="primary"
            ghost
          >
            追加
          </Button>
          <Button title="清空当前配置的模版" onClick={handleClearValue} danger>
            清空
          </Button>
        </div>
      </div>

      <SettingModal
        visiable={settingModalVisiable}
        rawData={list}
        onCancel={() => setSettingModalVisiable(false)}
        onDataUpdate={() => setList(getData())}
        footer={[]}
      />
      <Modal
        open={editorVisiable}
        onCancel={() => setEditorVisiable(false)}
        width="500px"
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
