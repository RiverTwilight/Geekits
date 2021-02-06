import ReactDOM from "react-dom";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

// /**
//  * 初始化设置
//  */
// !localStorage.setting &&
// 	localStorage.setItem(
// 		"setting",
// 		JSON.stringify({
// 			theme: 0,
// 			hitokotoTopic: 0,
// 		})
// 	);

// const setDark = () => {
// 	document
// 		.getElementsByTagName("body")[0]
// 		.classList.add("mdui-theme-layout-dark");
// };

// const setLight = () => {
// 	document
// 		.getElementsByTagName("body")[0]
// 		.classList.remove("mdui-theme-layout-dark");
// };

// const theme = localStorage.setting ? JSON.parse(localStorage.setting).theme : 0;

// /** 此逻辑兼容性最好 */
// if (theme === 0 && window.matchMedia) {
// 	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
// 		setDark();
// 	} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
// 		setLight();
// 	}
// } else {
// 	if (theme === 2) {
// 		setDark();
// 	} else {
// 		setLight();
// 	}
// }

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
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
