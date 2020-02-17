import React from 'react'
import { Link } from "react-router-dom"

//栏目下工具组
const MakeChips = props => {
	console.log(props)
	var chips = props.apps.map((a,i)=>{
		return(
			<Link to={"/apps/" + a.link}>
	            <div class="mdui-chip mdui-text-color-theme-text">
		            <span class="mdui-chip-title">{a.name}</span>
	            </div>
            </Link>
		)
	})
	return chips
}

//分类栏目
const MakeChannels = props =>{
	var { img, name, apps, description} = props.data;
	return(
		<div class="channel mdui-card mdui-p-a-1">
	        <li class=" mdui-list-item">
	            <div class="mdui-list-item-avatar">
		            <img src={img}/></div>
	            <div class="mdui-list-item-content">
		            <div class="mdui-list-item-title">{name}</div>
		            <div class="mdui-list-item-text mdui-list-item-one-line">
		            {description}
		            </div>
		        </div>
	        </li>
	        <MakeChips apps={apps} />
        </div>
    )
}

/********发现*********/
class Wow extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
			data: [{
				name: 'AI',
				description:'Only my railgun',
				img:null,
				apps: [{
					name: 'pornhub风格图片生成',
					link: 'fake_pornhub_logo',
					icon: ''
				}, {
					name: 'B站视频封面获取',
					link: 'bilibili_cover',
					icon: ''
				}]
			}]
		}
    }
    getDataFromSever(){
    	//todo
    }
    render(){
    	const list = this.state.data.map((a,i)=>{   		
    		return(
    			<MakeChannels key={i} data={a} />
    		)
    	})
    	return list
    }    
}

export default ()=><Wow />;