import ReactDOM from "react-dom/client";
import Content from "./components/content";

const app = document.createElement("div");
const appId = "rice-container";
app.id = appId;
document.body.appendChild(app);
ReactDOM.createRoot(document.getElementById(appId)).render(<Content />);
