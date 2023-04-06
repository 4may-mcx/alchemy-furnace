import { List } from "antd";

const data = [
  "Racing",
  "Japanese",
  "Australian",
  "Man",
  "Los Angeles",
  "Los Angeles",
  "Los Angeles",
  "Los Angeles",
  "Los Angeles",
  "Los Angeles",
  "Los Angeles",
];

const CheckList = () => (
  <>
    <List
      size="small"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </>
);
export default CheckList;
