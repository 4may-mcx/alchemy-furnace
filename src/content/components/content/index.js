import { useState } from "react";
import classNames from "./index.module.scss";
import Menu from "../menu";

const Content = () => {
  const [mainModalVisiable, setMainModalVisiable] = useState(false);

  return (
    <>
      <div className={classNames[`RC-container`]}>
        <div
          className={classNames.entry}
          onClick={() => setMainModalVisiable(!mainModalVisiable)}
        ></div>
        <Menu visiable={mainModalVisiable} />
      </div>
    </>
  );
};

export default Content;
