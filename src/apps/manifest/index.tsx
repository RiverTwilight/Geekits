import React from 'react'
import { ListControlMenu, Input, ColorPicker, ListControlCheck } from 'mdui-in-react'
import saveFile from '../../utils/fileSaver'

/***https://developer.mozilla.org/zh-CN/docs/Web/Manifest***/


const Preview = (props: any) => {
	const { config } = props;
	if (config === "") return null;
	var exportConfig = JSON.parse(JSON.stringify(config));
	console.log(exportConfig)

	exportConfig.relatedApp = config.relatedApp.data;
	exportConfig.display = displays[config.display].value;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'icon' implicitly has an 'any' type.
	config.icons.map((icon, i) => {
		exportConfig.icons[i].sizes = `${icon.sizes}x${icon.sizes}`
	})

	var res = JSON.stringify(JSON.parse(JSON.stringify(exportConfig)), null, 4);
	return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			<Input
// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
				rows="10"
				header=""
				value={res}
			/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			<button
				onClick={() => {
					var blob = new Blob([res], { type: "application/json;charset=utf-8" });
// @ts-expect-error ts-migrate(2345) FIXME: Property 'type' is missing in type '{ file: Blob; ... Remove this comment to see the full error message
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

type IconsState = any;

class Icons extends React.Component<{}, IconsState> {
	constructor(props: {}) {
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
// @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Readonly<{... Remove this comment to see the full error message
		var applist = this.props.list.map((icon, i) => {
			let button = (edit) ?
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<button onClick={() => this.props.delete(i)} className="mdui-btn mdui-list-item-icon mdui-btn-icon">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-icon material-icons mdui-text-color-red">delete</i>
				</button>
				:
				null
			return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-list-item-icon mdui-icon material-icons">insert_photo</i>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-list-item-content">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<div className="mdui-list-item-title">{`${icon.sizes}x${icon.sizes}`}</div>
					</div>
					{button}
				</li>
			)
		})
		return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<li className="mdui-subheader">
					图标&nbsp;&nbsp;
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<span mdui-dialog="{target:'#icon',history:false}" className="mdui-text-color-theme">添加</span>
					&nbsp;&nbsp;
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<span
						onClick={() => {
							this.setState({ edit: !edit })
						}}
						className="mdui-text-color-theme">
						{(!edit) ? '编辑' : '确定'}
					</span>
				</li>
				{applist}
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div style={{ display: 'inline-block' }} className="mdui-dialog" id="icon">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-dialog-content">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<Input
							onValueChange={newText => {
								this.setState({ src: newText })
							}}
							header="图标路径"
							value={src}
						/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<Input
							onValueChange={newText => {
								this.setState({ sizes: newText })
							}}
							header="尺寸（只需填写长或宽任意一个）"
							type="number"
							value={sizes}
						/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<Input
							onValueChange={newText => {
								this.setState({ type: newText })
							}}
							header="图标文件类型"
							value={type}
						/>
					</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-dialog-actions">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<button
							onClick={() => {
								if (update.open) {
// @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'Readonly... Remove this comment to see the full error message
									this.props.update(update.i, {
										src: src,
										sizes: sizes,
										type: type
									})
									update.open = false
									this.setState({ update: update })
								} else {
// @ts-expect-error ts-migrate(2339) FIXME: Property 'add' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
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
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<button className="mdui-btn mdui-ripple" mdui-dialog-close="true">取消</button>
					</div>
				</div>
			</>
		)
	}
}

type RelatedAppState = any;

class RelatedApp extends React.Component<{}, RelatedAppState> {
	constructor(props: {}) {
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
// @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Readonly<{... Remove this comment to see the full error message
		var applist = this.props.list.map((app, i) => {
			let button = (edit) ?
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<button onClick={() => this.props.delete(i)} className="mdui-btn mdui-list-item-icon mdui-btn-icon">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-icon material-icons mdui-text-color-red">delete</i>
				</button>
				:
				null
			return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-list-item-avatar mdui-icon material-icons">apps</i>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-list-item-content">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<div className="mdui-list-item-title">{app.url}</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<div className="mdui-list-item-text mdui-list-item-one-line">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
							<span className="mdui-text-color-theme-text">{app.store}</span>
							{app.id}</div>
					</div>
					{button}
				</li>
			)
		})
		return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<li className="mdui-subheader">
					推荐安装原生APP&nbsp;&nbsp;
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<span mdui-dialog="{target:'#relatedApp',history:false}" className="mdui-text-color-theme">添加</span>
					&nbsp;&nbsp;
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<span
						onClick={() => {
							this.setState({ edit: !edit })
						}}
						className="mdui-text-color-theme">
						{(!edit) ? '编辑' : '确定'}
					</span>
				</li>
				{applist}
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<li className="mdui-subheader"></li>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div className="mdui-dialog" id="relatedApp">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-dialog-content">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<Input
							onValueChange={newText => {
								this.setState({ store: newText })
							}}
							header="可以找到应用程序的平台"
							value={store}
						/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<Input
							onValueChange={newText => {
								this.setState({ url: newText })
							}}
							header="可以找到应用程序的URL"
// @ts-expect-error ts-migrate(2322) FIXME: Type '"url"' is not assignable to type '"number" |... Remove this comment to see the full error message
							type="url"
							value={url}
						/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<Input
							onValueChange={newText => {
								this.setState({ id: newText })
							}}
							header="用于表示指定平台上的应用程序的ID"
							value={id}
						/>
					</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-dialog-actions">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<button
							onClick={() => {
								if (update.open) {
// @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'Readonly... Remove this comment to see the full error message
									this.props.update(update.i, {
										store: store,
										url: url,
										id: id
									})
									update.open = false
									this.setState({ update: update })
								} else {
// @ts-expect-error ts-migrate(2339) FIXME: Property 'add' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
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
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<button className="mdui-btn mdui-ripple" mdui-dialog-close="true">取消</button>
					</div>
				</div>
			</>
		)

	}
}

type CreateState = any;

class Create extends React.Component<{}, CreateState> {
	constructor(props: {}) {
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
// @ts-expect-error ts-migrate(2339) FIXME: Property 'complete' does not exist on type 'Readon... Remove this comment to see the full error message
		const { complete, previewFunc } = this.props
		return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<Input
					onValueChange={newText => {
						this.setState({ name: newText })
					}}
					header="应用名称"
					value={name}
				/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<Input
					onValueChange={newText => {
						this.setState({ short_name: newText })
					}}
					header="短名称"
					value={short_name}
				/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<Input
					onValueChange={newText => {
						this.setState({ description: newText })
					}}
					header="应用描述"
					value={description}
				/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<Input
					onValueChange={newText => {
						this.setState({ lang: newText })
					}}
					header="语言标记"
					value={lang}
				/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div className="mdui-row-xs-2">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-col">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<ColorPicker
							text="预定义背景色"
							color={background_color}
							onColorChange={newColor => {
								this.setState({ background_color: newColor })
							}}
						/>
					</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-col">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<ColorPicker
							text="主题颜色"
							color={theme_color}
							onColorChange={newColor => {
								this.setState({ theme_color: newColor })
							}}
						/>
					</div>
				</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<ul className="mdui-list">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<ListControlMenu
						icon="language"
// @ts-expect-error ts-migrate(2322) FIXME: Property 'text' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
						text="显示模式"
						checked={display}
						onCheckedChange={checked => {
							this.setState({ display: checked })
						}}
						items={displays}
					/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<Icons
// @ts-expect-error ts-migrate(2322) FIXME: Property 'list' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
						list={icons}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newIcon' implicitly has an 'any' type.
						add={newIcon => {
							icons.push(newIcon);
							this.setState({
								icons: icons
							})
						}}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
						delete={i => {
							icons.splice(i, 1);
							this.setState({
								icons: icons
							})
						}}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
						update={(i, info) => {
							icons.splice(i, 1, info);
							this.setState({
								icons: icons
							})
						}}
					/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<span style={{ display: (relatedApp.open) ? 'block' : 'none' }}>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<RelatedApp
// @ts-expect-error ts-migrate(2322) FIXME: Property 'list' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
							list={relatedApp.data}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newApp' implicitly has an 'any' type.
							add={newApp => {
								relatedApp.data.push(newApp)
								this.setState({
									relatedApp: relatedApp
								})
							}}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
							delete={i => {
								relatedApp.data.splice(i, 1);
								this.setState({
									relatedApp: relatedApp
								})
							}}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
							update={(i, info) => {
								relatedApp.data.splice(i, 1, info);
								this.setState({
									relatedApp: relatedApp
								})
							}}
						/>
					</span>
				</ul>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<button
					onClick={() => {
						complete(this.state);
						previewFunc()
					}}
					className="mdui-fab mdui-color-theme mdui-fab-fixed">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-icon material-icons">&#xe5ca;</i>
				</button>
			</>
		)
	}
}

type UiState = any;

class Ui extends React.Component<{}, UiState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			result: ""
		}
	}
	render() {
		return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div className="mdui-tab" mdui-tab="true">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<a href="#input" className="mdui-ripple">编辑</a>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<a ref={r => this.previewBtn = r} href="#preview" className="mdui-ripple">预览</a>
				</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div id="input">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<Create
// @ts-expect-error ts-migrate(2322) FIXME: Property 'complete' does not exist on type 'Intrin... Remove this comment to see the full error message
						complete={result => {
							this.setState({ result: result })
						}}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'previewBtn' does not exist on type 'Ui'.
						previewFunc={() => this.previewBtn.click()}
					/>
				</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div id="preview">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<Preview config={this.state.result} />
				</div>
			</>
		)
	}
}

export default Ui
