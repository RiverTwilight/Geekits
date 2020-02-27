import PropTypes from 'prop-types'
import React from 'react'

/***
   *列表控制-菜单组件
   *2020-02-16 江村暮
   **/


const Dialog = props => {
	const items = props.items.map((item,i)=>{
		return(
		    <label key={i} mdui-dialog-close="true" className="mdui-list-item mdui-ripple">
			    <div className="mdui-radio">
			        <input
						onChange={e=>props.onCheckedChange(i)} 
				        type="radio" key={i}
				        checked={props.items[props.checked].value === item.value}/>
			        <i className="mdui-radio-icon"></i>
			    </div>
		        <div className="mdui-list-item-content">{item.name}</div>
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
	const { checked, items, text } = props;
	return(
        <React.Fragment>
			<li mdui-dialog="{target:'#list',history:false}" className="mdui-list-item mdui-ripple">
			    <i className="mdui-list-item-icon mdui-icon material-icons">{props.icon}</i>
			    <div className="mdui-list-item-content">
				    <div className="mdui-list-item-title mdui-list-item-one-line">{text}</div>
	                <div className="mdui-list-item-text mdui-list-item-one-line">{items[checked].name}</div>
	            </div>
			</li>
			<Dialog 
				checked={checked}
				title={text}
				onCheckedChange={props.onCheckedChange}
				items={items} />
		</React.Fragment>
	)
}

ListControlMenu.defaultProps = {
    icon: 'settings',
    onCheckedChange:()=>{}
}

ListControlMenu.propTypes = {
	text: PropTypes.string.isRequired, //文本
	checked: PropTypes.number.isRequired, //选中的项目名索引
	items: PropTypes.array.isRequired,//待选项目
	onCheckedChange: PropTypes.func, //回调函数
	icon: PropTypes.string //图标
}

export default ListControlMenu