import PropTypes from 'prop-types'
import React from 'react'

/***
   *列表控制-菜单组件
   *2020-02-16 江村暮
   **/

const Dialog = props => {
	const items = props.items.map((item,i)=>{
		return(
		    <label mdui-dialog-close="true" class="mdui-list-item mdui-ripple">
			    <div class="mdui-radio">
			        <input
						onChange={()=>props.onCheckedChange(item.name)} 
				        type="radio" checked={props.checked === item.name}/>
			        <i class="mdui-radio-icon"></i>
			    </div>
		        <div class="mdui-list-item-content">{item.name}</div>
		    </label>
		)
	})
	return(
		<div className="mdui-dialog" id="list">
			<div className="mdui-dialog-title">{props.title}</div>
            <div className="mdui-dialog-content">
	            <ul className="mdui-list">{items}</ul>
            </div>
            <div className="mdui-dialog-actions">
			    <button mdui-dialog-close="true" className="mdui-btn mdui-ripple">取消</button>
            </div>
        </div>
	)
}

const ListControlMenu = props => {
	return(
        <React.Fragment>
			<li mdui-dialog="{target:'#list',history:false}" className="mdui-list-item mdui-ripple">
			    <i className="mdui-list-item-icon mdui-icon material-icons">{props.icon}</i>
			    <div className="mdui-list-item-content">
				    <div className="mdui-list-item-title mdui-list-item-one-line">{props.text}</div>
	                <div className="mdui-list-item-text mdui-list-item-one-line">{props.checked}</div>
	            </div>
			</li>
			<Dialog 
				checked={props.checked}
				title={props.text}
				onCheckedChange={props.onCheckedChange} items={props.items} />
		</React.Fragment>
	)
}

ListControlMenu.defaultProps = {
    icon: 'settings',
    onCheckedChange:()=>{}
}

ListControlMenu.propTypes={
    text:PropTypes.string.isRequired,//文本
    checked:PropTypes.string.isRequired,//选中的项目名称
    onCheckedChange:PropTypes.func,//回调函数
    icon:PropTypes.string//图标
}

export default ListControlMenu