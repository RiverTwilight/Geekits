import React from 'react'
import { Link } from "react-router-dom"

import ListControlCheck from '../../utils/mdui-in-react/ListControlCheck'
import ListControlMenu from '../../utils/mdui-in-react/ListControlMenu'

const setFunc = {
	homeShowNewestTool: checked => {
		localStorage.setItem('homeShowNewestTool', String(checked))
	},
	hideHelper: checked => {
		localStorage.setItem('hideHelper', String(checked))
		if (!checked) localStorage.removeItem('hideHelper')
	},
	darkMode: checked => {
		if (checked) {
			document.getElementsByTagName('body')[0].classList.add("mdui-theme-layout-dark")
		} else {
			document.getElementsByTagName('body')[0].classList.remove("mdui-theme-layout-dark")
		}
		localStorage.setItem('darkMode', String(checked))
	},
	hitokotoTopic: checked => {
		localStorage.setItem('hitokotoTopic', hitokotoItems[checked].value)
	}
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
    	const { homeShowNewestTool, darkMode, hideHelper, hitokotoTopic } = this.state
	    window.titleRef.innerText = '设置'
	  	return(
	  		<ul class="mdui-list">
	  		    <li class="mdui-subheader">通用</li>
				<ListControlCheck
					icon="brightness_3"
					text="夜间模式"
					checked={darkMode === 'true'}
					onCheckedChange={checked=>{
						this.setState({darkMode:String(checked)})
					    setFunc.darkMode(checked)
					}}
				/>
				<ListControlCheck
					icon="apps"
					text="首页展示最新工具"
					checked={homeShowNewestTool === 'true'}
					onCheckedChange={checked=>{
						this.setState({homeShowNewestTool:String(checked)})
					    setFunc.homeShowNewestTool(checked)
					}}
				/>
				<ListControlCheck
					icon="help"
					text="隐藏使用说明"
					checked={hideHelper === 'true'}
					onCheckedChange={checked=>{
						this.setState({hideHelper:String(checked)})
					    setFunc.hideHelper(checked)
					}}
				/>
	  		    <li class="mdui-subheader">个性化</li>
				<ListControlMenu
					icon="stars"
					text="一言来源"
					checked={hitokotoTopic}
					onCheckedChange={checked=>{
						this.setState({hitokotoTopic:checked})
					    setFunc.hitokotoTopic(checked)
					}}
					items={hitokotoItems}
				/>
			</ul>
	  	)
    }
}

export default ()=> <Ui />