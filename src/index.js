import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'),()=>{
	var loading = document.getElementById('loading');
	loading.style.display = 'none';	
	if (localStorage.darkMode === 'true') {
		document.getElementsByTagName('body')[0].classList.add("mdui-theme-layout-dark")
	}
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
