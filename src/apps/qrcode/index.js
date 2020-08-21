import React from 'react'
import QRCode from 'qrcode'
import { Input, ListControlMenu, ColorPicker, RangeInput, FileInput } from 'mdui-in-react'

const create = (opts, text, callback, iconData) => {

	const loadImgae = url => {
		return new Promise(resolve => {
			const image = new Image();
			image.addEventListener('load', () => {
				resolve(image);
			});
			image.src = url;
		});
	}

	const addIcon = (qrData, iconData) => {

		const qr = loadImgae(qrData)
		const icon = loadImgae(iconData)

		Promise.all([qr, icon]).then(arr => {
			let icon = arr[1];
			let qr = arr[0];
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d');
			canvas.height = qr.height;
			canvas.width = qr.width;
			ctx.drawImage(qr, 0, 0, qr.width, qr.height);
			let iconSize = qr.width * 0.2;
			let iconPos = qr.width / 2 - qr.width * 0.1;
			ctx.drawImage(icon, iconPos, iconPos, iconSize, iconSize)
			callback(canvas.toDataURL())
		})
	}
	QRCode.toDataURL(text, opts, (err, url) => {
		if (err) throw erricon.width
		if (iconData) {
			addIcon(url, iconData)
		} else {
			callback(url)
		}
	})
}

const Result = ({ qrcode }) => {
	if (!qrcode) return null
	return (
		<div className="mdui-card mdui-shadow-2 mdui-p-a-1">
			<center><img src={qrcode}></img></center>
		</div>
	)
}

class Qrcode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			wifi: {
				account: "",
				pwd: ""
			},
			mode: 0,
			icon: null,
			colorLight: '#ffffff',
			colorDark: '#000000',
			width: '100',
			qrcode: null
		}
	}
	render() {
		const { text, colorDark, colorLight, qrcode, mode, wifi, width, icon } = this.state
		const Form = mode === 0
			?
			(
				<Input
					onValueChange={newText => {
						this.setState({ text: newText })
					}}
					header="输入文本"
					value={text}
				/>)
			:
			(
				<>
					<Input
						onValueChange={newText => {
							this.setState({
								wifi: {
									account: newText,
									pwd: wifi.pwd
								}
							})
						}}
						header="账号(SSID)"
						icon="account_circle"
						value={wifi.account}
					/>
					<Input
						onValueChange={newText => {
							this.setState({
								wifi: {
									account: wifi.account,
									pwd: newText
								}
							})
						}}
						header="密码"
						icon="vpn_key"
						value={wifi.pwd}
					/>
				</>
			)
		return (
			<>
				<div className="mdui-tab" mdui-tab="true">
					<a href="#normal" className="mdui-ripple">基本设置</a>
					<a href="#advance" className="mdui-ripple">高级</a>
				</div>
				<div id="normal">
					{Form}
					<RangeInput
						value={width}
						min="50" max="200"
						onValueChange={newValue => {
							this.setState({ width: newValue })
						}}
						title={"大小" + width + "px"}
					/>
				</div>
				<div id="advance">
					<ListControlMenu
						icon="language"
						title="二维码类型"
						checked={mode}
						onCheckedChange={checked => {
							this.setState({ mode: checked })
						}}
						items={[{
							name: '文本',
							value: 'text'
						}, {
							name: 'wifi',
							value: 'wifi'
						}]}
					/>
					<div className="mdui-row-xs-2">
						<div className="mdui-col">
							<ColorPicker
								text="亮色"
								color={colorLight}
								onColorChange={newColor => {
									this.setState({ colorLight: newColor })
								}}
							/>
						</div>
						<div className="mdui-col">
							<ColorPicker
								text="暗色"
								color={colorDark}
								onColorChange={newColor => {
									this.setState({ colorDark: newColor })
								}}
							/>
						</div>
					</div>
					<div className="mdui-divider"></div>
					<br></br>
					<div class="mdui-typo-headline">图标</div>
					<br></br>
					<FileInput
						fileType="image/*"
						file={icon}
						onFileChange={file => {
							this.setState({
								icon: file
							})
						}}
					/>
				</div>
				<br></br>
				<Result qrcode={qrcode} />
				<button
					onClick={() => {
						var opts = {
							errorCorrectionLevel: 'H',
							type: 'image/jpeg',
							quality: 0.3,
							margin: 1,
							width: width,
							color: {
								dark: colorDark,
								light: colorLight
							}
						}
						const string = (mode === 1) ? `WIFI:S:${wifi.account};P:${wifi.pwd};T:;H:;` : ((text === '') ? 'ygktool.cn' : text)
						const callback = qrcode => {
							this.setState({ qrcode: qrcode })
						}
						create(opts, string, callback, icon)
					}}
					className="mdui-color-theme mdui-text-color-white mdui-fab mdui-fab-fixed"
				>
					<i className="mdui-icon material-icons">&#xe5ca;</i>
				</button>
			</>
		)
	}
}

export default Qrcode
