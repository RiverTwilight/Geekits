import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const setDark = () => {
	document.getElementsByTagName('body')[0].classList.add("mdui-theme-layout-dark");
	localStorage.setItem('darkMode', 'true')
}
if (localStorage.darkMode === 'true' || (window.matchMedia && window.matchMedia('prefers-color-scheme: dark').matches)) {
	console.log('dark');
	setDark()
}

ReactDOM.render(<App />, document.getElementById('root'), _ => {});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
