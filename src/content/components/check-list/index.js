import { Transfer } from "antd";
import { useState } from "react";
import { getData } from "../../data/talks";

const CheckList = ({ handleKeyChange, targetKeys }) => {
  const [mockData] = useState(getData());

  const filterOption = (inputValue, option) =>
    option.title.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys) => {
    handleKeyChange(newTargetKeys);
  };

  return (
    <Transfer
      dataSource={mockData}
      showSearch
      filterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => item.title}
    />
  );
};
export default CheckList;
