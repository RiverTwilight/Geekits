import React from 'react';
import Logined from './dashboard/index.js'
import { getUserInfo } from '../../utils/UserInfo'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	userInfo:getUserInfo()
        }       
    }
    render(){
        const { userInfo } = this.state
        window.globalRef.title.innerText = '我的账户'
    	if(!userInfo)window.location.href = '/user/login'
        return <Logined />
    }
}
