import React from 'react';
import mdui from 'mdui';
import { Link } from "react-router-dom";

//未登录
const NoLogined = ()=>{
	return(
		<div style={{marginTop:'100px'}}>
            <center>
		        <h1>
			        <i 
				        class="nologin mdui-list-item-icon mdui-icon material-icons mdui-text-color-grey">
				        mood_bad
			        </i>
			    </h1>
	            <button disabled="true" class="mdui-color-theme mdui-btn mdui-btn-raised">立即登录</button>
	            <p>登录后你可以</p>
	            <div class="mdui-text-color-grey mdui-typo">
	                <li>云端同步工具收藏</li>
	                <li>免费享受全站工具</li>
	                <li>个人数据集中管理</li>
	                <li>有机会成为网站管理员（站长忙得很）</li>
	            </div>
            </center>
       </div> 
	)
}

class Logined extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }       
    }
    render(){
    	return <h1>开发中</h1>
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	logined:false
        }       
    }
    render(){
    	if(!this.state.logined)return <NoLogined />
    }
}

export default ()=><Home />;