import React from 'react';
import { Link } from "react-router-dom";
import Logined from './dashboard/index.js'
import { getUserInfo } from '../../utils/UserInfo'

//未登录
const NoLogined = () => {
	return(
		<div style={{marginTop:'100px'}}>
            <center>
	            <Link to="/user/login" className="mdui-color-theme mdui-btn mdui-btn-raised">登录/注册</Link>
	            <p>登录后你可以</p>
	            <div className="mdui-text-color-grey mdui-typo">
	                <li>云端同步工具收藏</li>
	                <li>免费享受全站工具</li>
	            </div>
            </center>
        </div> 
	)
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	userInfo:getUserInfo()
        }       
    }
    render(){
        const { userInfo } = this.state
        window.titleRef.innerText = '我的账户'
    	if(!userInfo)return <NoLogined />
        return <Logined />
    }
}
