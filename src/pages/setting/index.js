import React from 'react'
import { Link } from "react-router-dom"

import ListControlCheck from '../../utils/mdui-in-react/ListControlCheck'
import ListControlMenu from '../../utils/mdui-in-react/ListControlMenu'

function homeShowNewestTool(checked) {
	localStorage.setItem('homeShowNewestTool', String(checked))
}

function showHelper(checked) {
	localStorage.setItem('showHelper', String(checked))
	if(!checked)localStorage.removeItem('showHelper')
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
	name: '文学',
	value: 'c'
}, {
	name: '网络',
	value: 'd'
},{
	name: '原创',
	value: 'e'
},{
	name: '其他',
	value: 'f'
}]

function hitokotoTopic(checked){
	hitokotoItems.map(item=>{
		if(item.name === checked)localStorage.setItem('hitokotoTopic', item.value)
	})
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
	    	showHelper:Boolean(localStorage.showHelper),
	    	hitokotoTopic:parseHitokoto(localStorage.hitokotoTopic) || '随机'
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
					checked={this.state.showHelper === 'true'}
					onCheckedChange={checked=>{
						this.setState({showHelper:String(checked)})
					    showHelper(checked)
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