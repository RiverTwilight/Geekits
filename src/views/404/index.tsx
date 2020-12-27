import * as React from 'react'
import { Link } from "react-router-dom";

const NoMatch = () => (
	<div className="mdui-text-color-theme-text center-panel">
		<h2 className="mdui-text-center">电波无法到达哦</h2>
		<p>
			是不是地址拼错了？是/app不是/apps哦<br></br>
			想要的工具不见了？返回首页找找吧！<br></br>
		</p>
		<Link to="/" className="mdui-color-theme mdui-btn mdui-btn-raised">
			返回首页
		</Link>
	</div>
);

export default NoMatch
