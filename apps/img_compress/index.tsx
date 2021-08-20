import React from "react";
import ProcessImg from "./engine";
import Slider from "@material-ui/core/Slider";
import FileInput from "../../components/FileInput";
import SliderWithIcon from "../../components/SliderWithIcon";
import Button from "@material-ui/core/Button";

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
						handleFileUpload={(data, file) => {
							this.setState({
								file: data,
								// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
								type: file.type,
							});
						}}
						maxWidth="200px"
					/>
				</div>

				<SliderWithIcon title={`压缩比率${quality * 100}%`}>
					<Slider
						value={quality}
						onChange={(_, value) => {
							this.setState({ quality: Number(value) });
						}}
						aria-labelledby="continuous-slider"
						min={0.1}
						max={1}
						step={0.1}
					/>
				</SliderWithIcon>
				<Button
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
					disabled={!file}
					variant="contained"
					color="primary"
					component="span"
				>
					压缩
				</Button>
				<br />
				<br />
				{res && <img alt="处理结果" src={res} />}
			</>
		);
	}
}

export default ImgCompress;
