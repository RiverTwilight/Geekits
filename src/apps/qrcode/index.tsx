/* eslint-disable react/prop-types */
import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/qrcode` if it exists or ad... Remove this comment to see the full error message
import QRCode from 'qrcode'
import { Input, ListControlMenu, ColorPicker, RangeInput, FileInput } from 'mdui-in-react'

const create = (opts: any, text: any, callback: any, iconData: any) => {

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'url' implicitly has an 'any' type.
	const loadImgae = url => {
		return new Promise(resolve => {
			const image = new Image();
			image.addEventListener('load', () => {
				resolve(image);
			});
			image.src = url;
		});
	}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'qrData' implicitly has an 'any' type.
	const addIcon = (qrData, iconData) => {

		const qr = loadImgae(qrData)
		const icon = loadImgae(iconData)

		Promise.all([qr, icon]).then(arr => {
			let icon = arr[1];
			let qr = arr[0];
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d');
// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			canvas.height = qr.height;
// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			canvas.width = qr.width;
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			ctx.drawImage(qr, 0, 0, qr.width, qr.height);
// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			let iconSize = qr.width * 0.2;
// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			let iconPos = qr.width / 2 - qr.width * 0.1;
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			ctx.drawImage(icon, iconPos, iconPos, iconSize, iconSize)
			callback(canvas.toDataURL())
		})
	}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'err' implicitly has an 'any' type.
	QRCode.toDataURL(text, opts, (err, url) => {
		if (err) throw err
		if (iconData) {
			addIcon(url, iconData)
		} else {
			callback(url)
		}
	})
}

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'qrcode' implicitly has an 'any' t... Remove this comment to see the full error message
const Result = ({ qrcode }) => {
	if (!qrcode) return null
	return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="mdui-card mdui-shadow-2 mdui-p-a-1">
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
			<center><img alt="qrcode" src={qrcode}></img></center>
		</div>
	)
}

type QrcodeState = any;

class Qrcode extends React.Component<{}, QrcodeState> {
	constructor(props: {}) {
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
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<Input
					onValueChange={newText => {
						this.setState({ text: newText })
					}}
					header="输入文本"
					value={text}
				/>)
			:
			(
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div className="mdui-tab" mdui-tab="true">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<a href="#normal" className="mdui-ripple">基本设置</a>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<a href="#advance" className="mdui-ripple">高级</a>
				</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div id="normal">
					{Form}
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<RangeInput
						value={width}
						min="50" max="200"
						onValueChange={newValue => {
							this.setState({ width: newValue })
						}}
						title={"大小" + width + "px"}
					/>
				</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div id="advance">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-row-xs-2">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<div className="mdui-col">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
							<ColorPicker
								text="亮色"
								color={colorLight}
								onColorChange={newColor => {
									this.setState({ colorLight: newColor })
								}}
							/>
						</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
						<div className="mdui-col">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
							<ColorPicker
								text="暗色"
								color={colorDark}
								onColorChange={newColor => {
									this.setState({ colorDark: newColor })
								}}
							/>
						</div>
					</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-divider"></div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<br></br>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<div className="mdui-typo-headline">图标</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<br></br>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<FileInput
						fileType="image/*"
// @ts-expect-error ts-migrate(2769) FIXME: Property 'file' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
						file={icon}
						onFileChange={file => {
							this.setState({
								icon: file
							})
						}}
					/>
				</div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<br></br>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<Result qrcode={qrcode} />
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'qrcode' implicitly has an 'any' type.
						const callback = qrcode => {
							this.setState({ qrcode: qrcode })
						}
						create(opts, string, callback, icon)
					}}
					className="mdui-color-theme mdui-text-color-white mdui-fab mdui-fab-fixed"
				>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-icon material-icons">&#xe5ca;</i>
				</button>
			</>
		)
	}
}

export default Qrcode
