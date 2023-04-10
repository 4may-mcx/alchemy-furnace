import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "@/popup";

import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Popup />
    </ConfigProvider>
  </React.StrictMode>
);
