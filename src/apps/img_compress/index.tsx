import React from "react";
import ProcessImg from "./engine";
import { FileInput, RangeInput } from "mdui-in-react";

type State = any;

class ImgCompress extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			file: null,
			type: ".jpg",
			res: null,
			quality: 0.5,
		};
	}
	render() {
		const { file, quality, res, type } = this.state;
		return (
			<>
				<div className="center-with-flex">
					<FileInput
						readbydrag
						fileType="image/*"
						onFileUpload={(data, file) => {
							this.setState({
								file: data,
								// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
								type: file.type,
							});
						}}
						maxWidth="200px"
					/>
				</div>

				<RangeInput
					value={quality}
					min="0.1"
					max="1"
					step="0.1"
					onValueChange={(newValue) => {
						this.setState({ quality: Number(newValue) });
					}}
					title={`压缩比率${quality * 100}%`}
				/>

				<button
					onClick={() => {
						ProcessImg(
							file,
							quality,
							(res) => {
								this.setState({ res: res });
							},
							type
						);
					}}
					disabled={file === null}
					className="mdui-fab mdui-color-theme mdui-fab-fixed"
				>
					<i className="mdui-icon material-icons">check</i>
				</button>

				<img alt="处理结果" src={res} className="mdui-img-fluid" />
			</>
		);
	}
}

export default ImgCompress;
