import PropTypes from 'prop-types'
import React from 'react'

/***
   *列表控制-开关组件
   *2020-02-16 江村暮
   **/

const ListControlCheck = props => {
	return(
		<li class="mdui-list-item mdui-ripple">
		    <i class="mdui-list-item-icon mdui-icon material-icons">{props.icon}</i>
		    <div class="mdui-list-item-content">{props.text}</div>
		    <label class="mdui-switch">
		        <input 
			        onChange={e=>{
			        	props.onCheckedChange(e.target.checked)
			        }}
			        type="checkbox" checked={props.checked}
			    />
		        <i class="mdui-switch-icon"></i>
		    </label>
		</li>
	)
}

ListControlCheck.defaultProps = {
    icon: 'settings',
    onCheckedChange:()=>{}
}

ListControlCheck.propTypes={
    text:PropTypes.string.isRequired,//文本
    checked:PropTypes.bool.isRequired,//是否选中
    onCheckedChange:PropTypes.func,//回调函数
    icon:PropTypes.string//图标
}

export default ListControlCheck