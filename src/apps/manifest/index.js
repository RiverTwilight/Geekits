import React from 'react'
import { ListControlMenu, Input, ColorPicker, ListControlCheck } from 'mdui-in-react'
import saveFile from '../../utils/fileSaver'

/***https://developer.mozilla.org/zh-CN/docs/Web/Manifest***/


const Preview = props => {
	const { config } = props;
	if (config === "") return null;
	var exportConfig = JSON.parse(JSON.stringify(config));
	console.log(exportConfig)

	exportConfig.relatedApp = config.relatedApp.data;
	exportConfig.display = displays[config.display].value;

	config.icons.map((icon, i) => {
		exportConfig.icons[i].sizes = `${icon.sizes}x${icon.sizes}`
	})

	var res = JSON.stringify(JSON.parse(JSON.stringify(exportConfig)), null, 4);
	return (
		<>
			<Input
				rows="10"
				header=""
				value={res}
			/>
			<button
				onClick={() => {
					var blob = new Blob([res], { type: "application/json;charset=utf-8" });
					saveFile({
						file: blob,
						filename: "manifest.json"
					})
				}}
				className="mdui-btn mdui-btn-raised mdui-color-theme">
				下载manifest.json
	        </button>
		</>
	)
}

//定义开发人员对Web应用程序的首选显示模式
const displays = [{
	name: '全屏显示',
	value: 'fullscreen'
}, {
	name: '独立的应用程序（不含浏览器UI）',
	value: 'standalon'
}, {
	name: '独立的应用程序（含有浏览器UI）',
	value: 'minimal-u'
}, {
	name: '传统模式',
	value: 'browser'
},]

class Icons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			src: "",
			sizes: "",
			type: "png",
			edit: false,
			update: {
				open: false,
				i: 0
			}
		}
	}
	render() {
		const { src, sizes, type, edit, update } = this.state;
		var applist = this.props.list.map((icon, i) => {
			let button = (edit) ?
				<button onClick={() => this.props.delete(i)} className="mdui-btn mdui-list-item-icon mdui-btn-icon">
					<i className="mdui-icon material-icons mdui-text-color-red">delete</i>
				</button>
				:
				null
			return (
				<li
					mdui-dialog="{target:'#icon',history:false}"
					className="mdui-list-item mdui-ripple"
					onClick={() => {
						update.open = true;
						update.i = i;
						this.setState({
							src: icon.src,
							sizes: icon.sizes,
							type: icon.type,
							edit: edit,
							update: update
						})
					}}>
					<i className="mdui-list-item-icon mdui-icon material-icons">insert_photo</i>
					<div className="mdui-list-item-content">
						<div className="mdui-list-item-title">{`${icon.sizes}x${icon.sizes}`}</div>
					</div>
					{button}
				</li>
			)
		})
		return (
			<>
				<li className="mdui-subheader">
					图标&nbsp;&nbsp;
					<span mdui-dialog="{target:'#icon',history:false}" className="mdui-text-color-theme">添加</span>
					&nbsp;&nbsp;
					<span
						onClick={() => {
							this.setState({ edit: !edit })
						}}
						className="mdui-text-color-theme">
						{(!edit) ? '编辑' : '确定'}
					</span>
				</li>
				{applist}
				<div style={{ display: 'inline-block' }} className="mdui-dialog" id="icon">
					<div className="mdui-dialog-content">
						<Input
							onValueChange={newText => {
								this.setState({ src: newText })
							}}
							header="图标路径"
							value={src}
						/>
						<Input
							onValueChange={newText => {
								this.setState({ sizes: newText })
							}}
							header="尺寸（只需填写长或宽任意一个）"
							type="number"
							value={sizes}
						/>
						<Input
							onValueChange={newText => {
								this.setState({ type: newText })
							}}
							header="图标文件类型"
							value={type}
						/>
					</div>
					<div className="mdui-dialog-actions">
						<button
							onClick={() => {
								if (update.open) {
									this.props.update(update.i, {
										src: src,
										sizes: sizes,
										type: type
									})
									update.open = false
									this.setState({ update: update })
								} else {
									this.props.add({
										src: src,
										sizes: sizes,
										type: type
									})
								}
							}}
							className="mdui-btn mdui-ripple" mdui-dialog-close="true">
							保存
						</button>
						<button className="mdui-btn mdui-ripple" mdui-dialog-close="true">取消</button>
					</div>
				</div>
			</>
		)
	}
}

class RelatedApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			store: "",
			url: "",
			id: "com.example.app1",
			edit: false,
			update: {
				open: false,
				i: 0
			}
		}
	}
	render() {
		const { store, url, id, edit, update } = this.state;
		var applist = this.props.list.map((app, i) => {
			let button = (edit) ?
				<button onClick={() => this.props.delete(i)} className="mdui-btn mdui-list-item-icon mdui-btn-icon">
					<i className="mdui-icon material-icons mdui-text-color-red">delete</i>
				</button>
				:
				null
			return (
				<li
					key={i}
					mdui-dialog="{target:'#relatedApp',history:false}"
					className="mdui-list-item mdui-ripple"
					onClick={() => {
						update.open = true;
						update.i = i;
						this.setState({
							store: app.store,
							url: app.url,
							id: app.id,
							update: update
						})
					}}>
					<i className="mdui-list-item-avatar mdui-icon material-icons">apps</i>
					<div className="mdui-list-item-content">
						<div className="mdui-list-item-title">{app.url}</div>
						<div className="mdui-list-item-text mdui-list-item-one-line">
							<span className="mdui-text-color-theme-text">{app.store}</span>
							{app.id}</div>
					</div>
					{button}
				</li>
			)
		})
		return (
			<>
				<li className="mdui-subheader">
					推荐安装原生APP&nbsp;&nbsp;
					<span mdui-dialog="{target:'#relatedApp',history:false}" className="mdui-text-color-theme">添加</span>
					&nbsp;&nbsp;
					<span
						onClick={() => {
							this.setState({ edit: !edit })
						}}
						className="mdui-text-color-theme">
						{(!edit) ? '编辑' : '确定'}
					</span>
				</li>
				{applist}
				<li className="mdui-subheader"></li>
				<div className="mdui-dialog" id="relatedApp">
					<div className="mdui-dialog-content">
						<Input
							onValueChange={newText => {
								this.setState({ store: newText })
							}}
							header="可以找到应用程序的平台"
							value={store}
						/>
						<Input
							onValueChange={newText => {
								this.setState({ url: newText })
							}}
							header="可以找到应用程序的URL"
							type="url"
							value={url}
						/>
						<Input
							onValueChange={newText => {
								this.setState({ id: newText })
							}}
							header="用于表示指定平台上的应用程序的ID"
							value={id}
						/>
					</div>
					<div className="mdui-dialog-actions">
						<button
							onClick={() => {
								if (update.open) {
									this.props.update(update.i, {
										store: store,
										url: url,
										id: id
									})
									update.open = false
									this.setState({ update: update })
								} else {
									this.props.add({
										store: store,
										url: url,
										id: id
									})
								}
							}}
							className="mdui-btn mdui-ripple" mdui-dialog-close="true">
							保存
						</button>
						<button className="mdui-btn mdui-ripple" mdui-dialog-close="true">取消</button>
					</div>
				</div>
			</>
		)

	}
}

class Create extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			short_name: "",
			description: "",
			lang: "zh-CN",
			display: 3,
			icons: [],
			relatedApp: { open: false, data: [] },
		}
	}
	render() {
		const { icons, display, description, lang, relatedApp, background_color, theme_color, name, short_name } = this.state
		const { complete, previewFunc } = this.props
		return (
			<>
				<Input
					onValueChange={newText => {
						this.setState({ name: newText })
					}}
					header="应用名称"
					value={name}
				/>
				<Input
					onValueChange={newText => {
						this.setState({ short_name: newText })
					}}
					header="短名称"
					value={short_name}
				/>
				<Input
					onValueChange={newText => {
						this.setState({ description: newText })
					}}
					header="应用描述"
					value={description}
				/>
				<Input
					onValueChange={newText => {
						this.setState({ lang: newText })
					}}
					header="语言标记"
					value={lang}
				/>
				<div className="mdui-row-xs-2">
					<div className="mdui-col">
						<ColorPicker
							text="预定义背景色"
							color={background_color}
							onColorChange={newColor => {
								this.setState({ background_color: newColor })
							}}
						/>
					</div>
					<div className="mdui-col">
						<ColorPicker
							text="主题颜色"
							color={theme_color}
							onColorChange={newColor => {
								this.setState({ theme_color: newColor })
							}}
						/>
					</div>
				</div>
				<ul className="mdui-list">
					<ListControlMenu
						icon="language"
						text="显示模式"
						checked={display}
						onCheckedChange={checked => {
							this.setState({ display: checked })
						}}
						items={displays}
					/>
					<Icons
						list={icons}
						add={newIcon => {
							icons.push(newIcon);
							this.setState({
								icons: icons
							})
						}}
						delete={i => {
							icons.splice(i, 1);
							this.setState({
								icons: icons
							})
						}}
						update={(i, info) => {
							icons.splice(i, 1, info);
							this.setState({
								icons: icons
							})
						}}
					/>
					<ListControlCheck
						icon="android"
						title="推荐安装原生APP"
						checked={relatedApp.open}
						onCheckedChange={checked => {
							this.setState({
								relatedApp: {
									open: checked, data: relatedApp.data
								}
							})
						}}
					/>
					<span style={{ display: (relatedApp.open) ? 'block' : 'none' }}>
						<RelatedApp
							list={relatedApp.data}
							add={newApp => {
								relatedApp.data.push(newApp)
								this.setState({
									relatedApp: relatedApp
								})
							}}
							delete={i => {
								relatedApp.data.splice(i, 1);
								this.setState({
									relatedApp: relatedApp
								})
							}}
							update={(i, info) => {
								relatedApp.data.splice(i, 1, info);
								this.setState({
									relatedApp: relatedApp
								})
							}}
						/>
					</span>
				</ul>
				<button
					onClick={() => {
						complete(this.state);
						previewFunc()
					}}
					className="mdui-fab mdui-color-theme mdui-fab-fixed">
					<i className="mdui-icon material-icons">&#xe5ca;</i>
				</button>
			</>
		)
	}
}

class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: ""
		}
	}
	render() {
		return (
			<>
				<div className="mdui-tab" mdui-tab="true">
					<a href="#input" className="mdui-ripple">编辑</a>
					<a ref={r => this.previewBtn = r} href="#preview" className="mdui-ripple">预览</a>
				</div>
				<div id="input">
					<Create
						complete={result => {
							this.setState({ result: result })
						}}
						previewFunc={() => this.previewBtn.click()}
					/>
				</div>
				<div id="preview">
					<Preview config={this.state.result} />
				</div>
			</>
		)
	}
}

export default Ui
