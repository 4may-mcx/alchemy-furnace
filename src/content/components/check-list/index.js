import { List } from "antd";

const data = ["Racing", "Japanese", "Australian", "Man"];

const CheckList = () => (
  <>
    <List
      size="small"
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </>
);
export default CheckList;
