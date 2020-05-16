import * as React from 'react'
import { ListControlMenu } from './types/development'

/**
 * 列表控制-菜单组件
 */

const Dialog = ({items, onCheckedChange, title, checked}:ListControlMenu) => {
	return(
		<div className="mdui-dialog" id="list">
			<div className="mdui-dialog-title">{title}</div>
            <div className="mdui-dialog-content">
				<ul className="mdui-list">{
					items.map((item: any, i: number)=>(
						<label key={i} mdui-dialog-close="true" className="mdui-list-item mdui-ripple">
							<div className="mdui-radio">
								<input
									onChange={_=>onCheckedChange && onCheckedChange(i)} 
									type="radio" key={i}
									checked={items[checked].value === item.value}/>
								<i className="mdui-radio-icon"></i>
							</div>
							<div className="mdui-list-item-content">{item.name}</div>
						</label>
					))
				}</ul>
            </div>
            <div className="mdui-dialog-actions">
			    <button mdui-dialog-close="true" className="mdui-btn mdui-ripple">取消</button>
            </div>
        </div>
	)
}

export default ({ checked, items, title = "请选择", onCheckedChange, icon = "setting" }: ListControlMenu )=> {
	return(
        <React.Fragment>
			<li mdui-dialog="{target:'#list',history:false}" className="mdui-list-item mdui-ripple">
			    <i className="mdui-list-item-icon mdui-icon material-icons">{icon}</i>
			    <div className="mdui-list-item-content">
				    <div className="mdui-list-item-title mdui-list-item-one-line">{title}</div>
	                <div className="mdui-list-item-text mdui-list-item-one-line">{items[checked].name}</div>
	            </div>
			</li>
			<Dialog 
				checked={checked}
				title={title}
				onCheckedChange={onCheckedChange}
				items={items}
			/>
		</React.Fragment>
	)
}
