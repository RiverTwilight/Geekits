import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/libgif` if it exists or ad... Remove this comment to see the full error message
import SuperGif from 'libgif'
import JSZip from 'jszip'
import saveFile from '../../utils/fileSaver'
import { FileInput } from 'mdui-in-react'
import './style.css'

function dataURLtoFile(dataurl: any, filename: any) {
	//将base64转换为文件
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, {
		type: mime
	});
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const Gallery = props => {
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'img' implicitly has an 'any' type.
	var gallery = props.res.map((img, i) => {
		return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="mdui-col">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<div className="mdui-grid-tile">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<img alt={`第${i}帧`} src={img} />
				</div>
			</div>
		)
	})
	return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div
			className="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-6 mdui-row-xl-7 mdui-grid-list">
			{gallery}
		</div>
	)
}

type UiState = any;

class Ui extends React.Component<{}, UiState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			file: null,
			rub: null,
			res: []
		}
	}
	render() {
		const { file, res } = this.state;
		return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				<center>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<img alt="上传的文件" className="mdui-img-fluid" ref={r => this.img = r} src={file} />
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<FileInput
						fileType="image/gif"
						readbydrag
						onFileChange={
							file => {
								this.setState({
									rub: null
								}, () => {
									this.setState({ file: file }, () => {
										var rub = new SuperGif({
// @ts-expect-error ts-migrate(2339) FIXME: Property 'img' does not exist on type 'Ui'.
											gif: this.img
										})
										this.setState({ rub: rub })
										rub.load(() => {
											console.log('oh hey, now the gif is loaded');
										})
									})
								})
							}
						}
					/>
{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
				</center>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<button
					onClick={() => {
						var zip = new JSZip();
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'img' implicitly has an 'any' type.
						res.forEach((img, i) => {
							zip.file(i + ".png", dataURLtoFile(img, i + '.png'))
						})
						zip.generateAsync({
							type: "blob"
						}).then(content => {
							saveFile({
								file: content,
								type: "zip",
								filename: "ygktool.gif_lib"
							})
						})
					}}
					style={{ display: (res.length) ? 'block' : 'none' }}
					className="mdui-btn mdui-color-theme">打包下载</button>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<button
					disabled={(file === null)}
					onClick={() => {
						var res = [];
						const { rub } = this.state;
						for (var i = 0; i <= rub.get_length(); i++) {
							rub.move_to(i);
							res.push(rub.get_canvas().toDataURL('image/jpeg', 0.8));
						}
						this.setState({ res: res })
					}}
					className="mdui-color-theme mdui-fab mdui-fab-fixed">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
					<i className="mdui-icon material-icons">check</i>
				</button>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<br></br>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
				<Gallery res={res} />
			</>
		)
	}
}

export default Ui
