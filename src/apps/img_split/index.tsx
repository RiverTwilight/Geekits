import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-cropper` if it exist... Remove this comment to see the full error message
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import JSZip from "jszip";
import { FileInput, Button } from "mdui-in-react";
import { dataURLtoFile, saveFile } from "../../utils/fileSaver";

type ImgCropperState = any;

class ImgCropper extends React.Component<{}, ImgCropperState> {
	constructor(props: {}) {
		super(props);
		this.state = {};
	}
	_crop() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'getCroppedCanvas' does not exist on type... Remove this comment to see the full error message
		var img = this.refs.cropper.getCroppedCanvas().toDataURL();
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'onCropperChange' does not exist on type ... Remove this comment to see the full error message
		this.props.onCropperChange(img);
	}
	render() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifHide' does not exist on type 'Readonly... Remove this comment to see the full error message
		console.log(this.props.ifHide);
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifHide' does not exist on type 'Readonly... Remove this comment to see the full error message
		if (this.props.ifHide) return null;
		return (
			<Cropper
				ref="cropper"
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'file' does not exist on type 'Readonly<{... Remove this comment to see the full error message
				src={this.props.file}
				style={{ height: 400, width: "100%" }}
				aspectRatio={1 / 1}
				guides={true}
				crop={this._crop.bind(this)}
			/>
		);
	}
}

//切图
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'src' implicitly has an 'any' type.
function Split(src, onCompleted) {
	var image = new Image();
	image.src = src;
	image.onload = () => {
		var numColsToCut = 3;
		var numRowsToCut = 3;
		var widthOfOnePiece = image.width / 3;
		var heightOfOnePiece = image.height / 3;
		var imagePieces = [];
		for (var y = 0; y < numColsToCut; ++y) {
			for (var x = 0; x < numRowsToCut; ++x) {
				var canvas = document.createElement("canvas");
				canvas.width = widthOfOnePiece;
				canvas.height = heightOfOnePiece;
				var context = canvas.getContext("2d");
				// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
				context.drawImage(
					image,
					x * widthOfOnePiece,
					y * heightOfOnePiece,
					widthOfOnePiece,
					heightOfOnePiece,
					0,
					0,
					canvas.width,
					canvas.height
				);
				imagePieces.push(canvas.toDataURL());
			}
		}
		onCompleted && onCompleted(imagePieces);
	};
}

const Gallary = ({ res }: { res: any[] }) => {
	if (!res.length) return null;
	return (
		<div className="mdui-row-xs-3 mdui-grid-list">
			{res.map((a, i) => (
				<div key={i} className="mdui-col">
					<div className="mdui-grid-tile">
						<img alt={`第${i}张照片`} src={a} />
					</div>
				</div>
			))}
		</div>
	);
};

type UiState = any;

class ImgSplit extends React.Component<{}, UiState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			file: null,
			res: [],
			cropperCache: null,
			ifHideCropper: true,
		};
	}
	generate = () => {
		// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
		Split(this.state.cropperCache, (res) => {
			this.setState({
				res: res,
				ifHideCropper: true,
			});
			var zip = new JSZip();
			res.foreach((img: string, i: number) => {
				zip.file(i + 1 + ".png", dataURLtoFile(img, i + 1 + ".png"));
			});
			zip.generateAsync({
				type: "blob",
			}).then((content) => {
				saveFile({
					file: content,
					filename: "ygktool.img_split.zip",
					type: "zip",
				});
			});
		});
	};
	render() {
		const { file, ifHideCropper } = this.state;
		return (
			<>
				<FileInput
					fileType="image/*"
					multiple={false}
					readbydrag
					onFileUpload={(file) => {
						this.setState({
							file: file,
							ifHideCropper: false,
						});
					}}
				/>
				<Button
					disabled={file === null}
					onClick={this.generate}
					title="确定"
					icon="check"
				/>
				<br></br>
				<ImgCropper
					// @ts-expect-error ts-migrate(2322) FIXME: Property 'ifHide' does not exist on type 'Intrinsi... Remove this comment to see the full error message
					ifHide={ifHideCropper}
					// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newImg' implicitly has an 'any' type.
					onCropperChange={(newImg) => {
						this.setState({ cropperCache: newImg });
					}}
					file={file}
				/>
				<br></br>
				<Gallary res={this.state.res} />
			</>
		);
	}
}

export default ImgSplit;
