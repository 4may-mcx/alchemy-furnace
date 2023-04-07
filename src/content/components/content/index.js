import { useState } from "react";
import classNames from "./index.module.scss";
import Menu from "../menu";
// import { isTargetPage } from "../menu/util";

const Content = () => {
  const [mainModalVisiable, setMainModalVisiable] = useState(false);

  return (
    <>
      {/* {isTargetPage() && ( */}
      <div className={classNames[`RC-container`]}>
        <div
          className={classNames.entry}
          onClick={() => setMainModalVisiable(!mainModalVisiable)}
        ></div>
        <Menu visiable={mainModalVisiable} />
      </div>
      {/* )} */}
    </>
  );
};

export default Content;
