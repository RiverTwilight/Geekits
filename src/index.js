import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ThemeProvider } from "@material-ui/core/styles";
import UserContextProvider from "./components/UserContextProvider";
import theme from "./utils/theme";

/**
 * 初始化设置
 */
!localStorage.setting &&
    localStorage.setItem(
        "setting",
        JSON.stringify({
            theme: 0,
            hitokotoTopic: 0,
        })
    );

const preferTheme = localStorage.setting
    ? JSON.parse(localStorage.setting).theme
    : 0;

var darkTheme = false;

/** 此逻辑兼容性最好 */
if (preferTheme === 0 && window.matchMedia) {
    darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
} else {
    darkTheme = preferTheme === 2;
}

ReactDOM.render(
    <ThemeProvider
        theme={theme({
            darkTheme,
        })}
    >
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </ThemeProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
