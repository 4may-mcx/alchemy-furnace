import { Transfer } from "antd";

const CheckList = ({ handleKeyChange, targetKeys, list }) => {
  const filterOption = (inputValue, option) =>
    option.title.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys) => {
    handleKeyChange(newTargetKeys);
  };

  return (
    <Transfer
      dataSource={list}
      showSearch
      filterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => item.title}
    />
  );
};
export default CheckList;
