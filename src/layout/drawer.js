import React from 'react'
import {
  NavLink
} from "react-router-dom"
import { Drawer } from 'mdui'
import applist from '../utils/appList'

const list = [{
  icon: 'home',
  iconColor: 'red',
  text: '首页',
  link: '/#home'
}, {
  icon: 'settings',
  iconColor: '',
  text: '设置',
  link: '/setting'
}]

const Menu = () => {   
    return list.map((a)=>(
        <NavLink 
            onClick={()=>{
                window.innerWidth <= 1024 && window.leftDrawer.close()
            }}
            key={a.link}
            exact className="mdui-list-item mdui-ripple"
            activeClassName="mdui-list-item-active" to={a.link}>        
            <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-"+ a.iconColor}>{a.icon}</i> 
            <div className="mdui-list-item-content">{a.text}</div>       
        </NavLink>
    ))
}

export default class SideDrawer extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                appsNumber:applist.length
            }
        }
    }
    componentDidMount(){
        window.leftDrawer = new Drawer('#left-drawer');
    }
    render(){
        const { data } = this.state;
        return (
            <div id="left-drawer" className="mdui-drawer">            
                <div id="grad">
                    <div className="text">
                        <p className="title">云极客工具</p>
                        <p className="subtitle">{`共有${data.appsNumber}个工具`}</p>
                    </div>
                </div>     
                <ul className="mdui-list"> 
                    <NavLink
                        onClick={()=>{
                            window.innerWidth <= 1024 && window.leftDrawer.close()
                        }}
                        exact className="mdui-list-item mdui-ripple"
                        activeClassName="mdui-list-item-active" to='/user'>                            
                        <i className="mdui-list-item-icon mdui-icon material-icons mdui-text-color-blue">account_box</i> 
                        <div className="mdui-list-item-content">我的账户</div>
                    </NavLink>
                    {/*<a href="https://api.ygktool.cn">
                        <li className="mdui-list-item mdui-ripple">                          
                            <i className="mdui-text-color-green mdui-list-item-icon mdui-icon material-icons">all_inclusive</i> 
                            <div className="mdui-list-item-content">开放平台</div>                            
                        </li>
                    </a> */}                   
                    <div className="mdui-divider"/>
                    <Menu />
                </ul> 
                <p className="mdui-text-center copyright">©2019-2020&nbsp;云极客工具</p>
            </div>
        )
    }
}
