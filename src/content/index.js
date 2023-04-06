import ReactDOM from "react-dom/client";
import classNames from "./index.module.scss";

const Content = () => {
  return (
    <div className={classNames[`RC-container`]}>
      <div className={classNames.entry}></div>
    </div>
  );
};

const app = document.createElement("div");
const appId = "rice-container";
app.id = appId;
document.body.appendChild(app);
ReactDOM.createRoot(document.getElementById(appId)).render(<Content />);
