import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'), _ => {
	const setDark = () => document.getElementsByTagName('body')[0].classList.add("mdui-theme-layout-dark")
	if (localStorage.darkMode === 'true') {
		setDark()
	} else if (document.getElementById('isDark').style.display === 'block') {
		console.log('dark');
		setDark()
	}
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
