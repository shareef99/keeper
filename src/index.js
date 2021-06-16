import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import "./styles/globals.scss";
import "./styles/utils.scss";
import "./styles/material-ui.scss";
import App from "./App";

ReactDOM.render(
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>,
    document.getElementById("root")
);
