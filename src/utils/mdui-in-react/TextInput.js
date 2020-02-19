import React from 'react'
import PropTypes from 'prop-types'

/**
  *输入框组件
  *@param {string} icon 图标，不写则隐藏图标
  *@param {string} header 标题文字
  *@param {function} onTextChange 内容变化时的回调函数，返回新的值
  *@param {string} type 输入类型,默认text
  *@param {string} value 必填，输入框的值
  *@param {string} placeholder 选填，为空则不显示，否则将固定标签
  *@param {string} rows 若填写自动转换为textarea标签
  *@param {bollean} autofocus 默认不聚焦
  **/

const TextInput = props =>{
	const icon = (props.icon)?
	<i className="mdui-icon material-icons">{props.icon}</i>
	:
	null;
    const TagType = (props.rows)?'textarea':'input';
    const Lable = (props.header)?
    <label className="mdui-textfield-label">{props.header || '输入框'}</label>
    :
    null
	return(
		<div className={`mdui-textfield ${(props.placeholder)?'':'mdui-textfield-floating-label'}`}>
            {(props.icon)?
                <i className="mdui-icon material-icons">{props.icon}</i>
                :
                null}{Lable}
            <TagType
                maxLength={props.maxlength || null}
                placeholder={props.placeholder || ''} 
                rows={props.rows}
                onChange={e=>{
                    props.onTextChange(e.target.value)
                }} 
                value={props.value||''}
                autoFocus={(props.autofocus)} type={props.type} className="mdui-textfield-input">
            </TagType>
        </div>
	)
}

export default TextInput