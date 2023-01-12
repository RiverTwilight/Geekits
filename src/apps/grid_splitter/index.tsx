import React from "react";
import Cropper from "react-cropper";
import Button from "@material-ui/core/Button";
import FilePicker from "@/components/FilePicker";
import JSZip from "jszip";
import { dataURLtoFile, saveFile } from "../../utils/fileSaver";
import splitToNineGrids from "./api";
import "cropperjs/dist/cropper.css";

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
		splitToNineGrids(this.state.cropperCache, (res) => {
			this.setState({
				res: res,
				ifHideCropper: true,
			});
			var zip = new JSZip();
			res.map((img: string, i: number) => {
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
				<FilePicker
					readByDrag
					fileType="image/*"
					handleFileUpload={(file) => {
						this.setState({
							file,
						});
					}}
				></FilePicker>
				<Button
					disabled={file === null}
					onClick={this.generate}
					title="确定"
				/>
				<br></br>
				<ImgCropper
					ifHide={ifHideCropper}
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
