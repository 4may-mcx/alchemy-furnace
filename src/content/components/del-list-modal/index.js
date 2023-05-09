import { useState, useRef } from "react";
import { Modal, Table, Button, Input } from "antd";
import classNames from "./index.module.scss";
import {
  addData,
  editConfig,
  delConfig,
  exportConfig,
  importConfig,
} from "../../data/talks";

const Mode = {
  ADD: "_v_add",
  EDIT: "_v_edit",
};

const SettingModal = ({ visiable, onDataUpdate, rawData, ...restProps }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescribe, setNewDescribe] = useState("");
  const [editorModalVisiable, setEditorModalVisiable] = useState(false);
  const currentConfigKeyRef = useRef(null);
  const currentEditModeRef = useRef(null);
  const columns = [
    {
      title: "模版名称",
      dataIndex: "title",
    },
    {
      title: "模版内容",
      dataIndex: "describe",
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: (_v, { key, title, describe }) => (
        <Button
          size="small"
          type="link"
          onClick={() => {
            currentEditModeRef.current = Mode.EDIT;
            currentConfigKeyRef.current = key;
            setNewTitle(title);
            setNewDescribe(describe);
            setEditorModalVisiable(true);
          }}
        >
          编辑
        </Button>
      ),
    },
  ];

  const handleAddConfig = () => {
    currentEditModeRef.current = Mode.ADD;
    setEditorModalVisiable(true);
  };

  const handleDelConfig = () => {
    delConfig(selectedRowKeys);
    onDataUpdate();
    setSelectedRowKeys([]);
  };

  const handleEditorConfirm = () => {
    switch (currentEditModeRef.current) {
      case Mode.ADD:
        const res = addData({ title: newTitle, describe: newDescribe });
        if (!res) {
          alert("该名称已被使用");
          return;
        }
        setNewTitle("");
        setNewDescribe("");
        break;
      case Mode.EDIT:
        editConfig(currentConfigKeyRef.current, newTitle, newDescribe);
        break;
      default:
    }
    onDataUpdate();
    setEditorModalVisiable(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const TableHeader = () => (
    <div className={classNames["RC-Table-Header"]}>
      <span style={{ fontSize: "17px", fontWeight: "bold" }}>配置列表</span>
      <div className={classNames["RC-Header-btns"]}>
        <Button
          title="删除选中项目"
          onClick={handleDelConfig}
          disabled={!selectedRowKeys.length}
        >
          删除
        </Button>
        <Button title="从json文件导入配置" onClick={importConfig}>
          导入
        </Button>
        <Button
          title="导出当前模版配置"
          onClick={() => exportConfig("helper-config")}
        >
          导出
        </Button>
        <Button type="primary" onClick={handleAddConfig}>
          添加配置
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <div className={classNames["RC-Modal-Container"]}>
        <Modal width="900px" open={visiable} {...restProps}>
          <Table
            title={() => <TableHeader />}
            columns={columns}
            dataSource={rawData}
            rowSelection={rowSelection}
          />
        </Modal>
      </div>

      {/* 编辑弹出框 */}
      <Modal
        closable={false}
        open={editorModalVisiable}
        onOk={handleEditorConfirm}
        onCancel={() => setEditorModalVisiable(false)}
      >
        <Input
          placeholder="enter title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="enter describe"
          value={newDescribe}
          onChange={(e) => setNewDescribe(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default SettingModal;
