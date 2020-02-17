import React from 'react';
import {
  Link
} from "react-router-dom";

import Drawer from './drawer'

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:props.title,
            searchResult:'',
            kwd:'',//用于传给结果组件的百度搜索,
            saying:'即使与全世界为敌，我也要保护她和她所在的世界'
        }
    } 
    componentDidMount(){
        this.props.getRef(this.refs.headerTitle);//将ref传给父组件，方便修改标题
        
        var { hitokotoTopic } = localStorage
        console.log(hitokotoTopic);
        var url = (!hitokotoTopic)?"":`?topic=${hitokotoTopic}`       
        fetch('https://api.ygktool.cn/api/hitokoto' + url)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({saying:json.hitokoto})
            })
    }
    render(){
        return (
            <React.Fragment>
                <Drawer drawerBtn={this.refs.drawerBtn}/> 
                <header className="header mdui-appbar mdui-appbar-fixed">
                    <div className="mdui-appbar">
                        <div className="mdui-toolbar mdui-color-theme">
                            <button 
                                onClick={()=>window.leftDrawer.toggle()}
                                className="mdui-btn mdui-btn-icon mdui-text-color-white">
                                <i className="mdui-icon material-icons">menu</i>
                            </button>
                            <Link to="/">
                                <div ref="headerTitle" className="mdui-typo-title mdui-text-color-white header-width-saying">
                                    {this.state.title}                               
                                </div>
                                <span className="mdui-text-truncate saying mdui-text-color-white ">{this.state.saying}</span>
                            </Link>
                            <div className="mdui-toolbar-spacer"></div>
                        </div>
                    </div>        
                </header>
            </React.Fragment>
        )
    }  
}

export default Header