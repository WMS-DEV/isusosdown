import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./assets/global.style";
import './assets/fonts.css'
import { RouterComponent } from './pages/RouterComponent';
import { initializeSentry } from "./analytics/initializeSentry";

const env = process.env.NODE_ENV;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <React.StrictMode>
        <RouterComponent />
        <GlobalStyle />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (env === "production") {
    reportWebVitals();
}
initializeSentry();

