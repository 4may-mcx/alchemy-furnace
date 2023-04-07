import { Transfer } from "antd";
import { useState } from "react";
import { talksData } from "../../data/talks";

const CheckList = ({ handleKeyChange }) => {
  const [mockData] = useState(talksData);
  const [targetKeys, setTargetKeys] = useState([]);

  const filterOption = (inputValue, option) =>
    option.title.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
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
