import * as React from 'react'
import { ListControlMenu } from './types/development'

/**
 * 列表控制-菜单组件
 */

const Dialog = ({ items, onCheckedChange, title, checked }: ListControlMenu) => (
	<div className="mdui-dialog" id={title}>
		<div className="mdui-dialog-title">{title}</div>
		<div className="mdui-dialog-content">
			<ul className="mdui-list">{
				items.map((item: any, i: number) => (
					<label key={item.name} mdui-dialog-close="true"  className="mdui-list-item mdui-ripple">
						<div className="mdui-radio">
							<input
								onChange={() => onCheckedChange && onCheckedChange(i)}
								type="radio"
								checked={items[checked].value === item.value} />
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

export default ({ checked, items, title = "请选择", onCheckedChange, icon }: ListControlMenu) => (
	<>
		<li mdui-dialog={"{target:'#" + title + "',history:false}"} className="mdui-list-item mdui-ripple">
			{icon && <i className="mdui-list-item-icon mdui-icon material-icons">{icon}</i>}
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
	</>
)

