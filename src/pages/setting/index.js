import React from 'react'
import { Link } from "react-router-dom"

import ListControlCheck from '../../utils/mdui-in-react/ListControlCheck'
import ListControlMenu from '../../utils/mdui-in-react/ListControlMenu'

function homeShowNewestTool(checked) {
	localStorage.setItem('homeShowNewestTool', String(checked))
}

function hideHelper(checked) {
	localStorage.setItem('hideHelper', String(checked))
	if(!checked)localStorage.removeItem('hideHelper')
}

function darkMode(checked) {
	if(checked){
		document.getElementsByTagName('body')[0].classList.add("mdui-theme-layout-dark")
	}else{
		document.getElementsByTagName('body')[0].classList.remove("mdui-theme-layout-dark")		
	}
	localStorage.setItem('darkMode', String(checked))
}

const hitokotoItems = [{
	name: '随机',
	value: ''
}, {
	name: '动漫',
	value: 'a'
}, {
	name: '漫画',
	value: 'b'
}, {
	name: '游戏',
	value: 'c'
}, {
	name: '小说',
	value: 'd'
},{
	name: '原创',
	value: 'e'
},{
	name: '网络',
	value: 'f'
},{
	name: '其他',
	value: 'g'
}]

function hitokotoTopic(checked){
	localStorage.setItem('hitokotoTopic', hitokotoItems[checked].value)
}

function parseHitokoto(value) {
	for(let i in hitokotoItems) {
		if (hitokotoItems[i].value === value)return hitokotoItems[i].name
	}
}

class Ui extends React.Component{
    constructor(props) {
	    super(props);
	    this.state = {
	    	homeShowNewestTool:localStorage.homeShowNewestTool || 'true',
	    	darkMode:localStorage.darkMode || 'false',
	    	hideHelper:Boolean(localStorage.hideHelper),
	    	hitokotoTopic:Number(localStorage.hitokotoTopic) || 0
	    }
    }
    render(){
    	console.log(parseHitokoto('c'))
	    window.titleRef.innerText = '设置'
	  	return(
	  		<ul class="mdui-list">
	  		    <li class="mdui-subheader">通用</li>
				<ListControlCheck
					icon="brightness_3"
					text="夜间模式"
					checked={this.state.darkMode === 'true'}
					onCheckedChange={checked=>{
						this.setState({darkMode:String(checked)})
					    darkMode(checked)
					}}
				/>
				<ListControlCheck
					icon="apps"
					text="首页展示最新工具"
					checked={this.state.homeShowNewestTool === 'true'}
					onCheckedChange={checked=>{
						this.setState({homeShowNewestTool:String(checked)})
					    homeShowNewestTool(checked)
					}}
				/>
				<ListControlCheck
					icon="help"
					text="隐藏使用说明"
					checked={this.state.hideHelper === 'true'}
					onCheckedChange={checked=>{
						this.setState({hideHelper:String(checked)})
					    hideHelper(checked)
					}}
				/>
	  		    <li class="mdui-subheader">个性化</li>
				<ListControlMenu
					icon="stars"
					text="首页一言类型"
					checked={this.state.hitokotoTopic}
					onCheckedChange={checked=>{
						this.setState({hitokotoTopic:checked})
					    hitokotoTopic(checked)
					}}
					items={hitokotoItems}
				/>
			</ul>
	  	)
    }
}

export default ()=> <Ui />