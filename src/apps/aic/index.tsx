import React from "react";
import { snackbar } from "mdui";
import { FileInput, ListControlMenu, BottomAlert } from "mdui-in-react";
import axios from "../../utils/axios";
import Cropper from "../../utils/Cropper";
import ImgCompress from "../img_compress/engine";

// TODO 快速保存到便签
const Result = ({ result }: any) => {
	if (!result) return null;
	return (
		<>
			{result.map(({ keyword, baike_info, score }: any, i: any) => (
				<>
					<div key={i} className="mdui-col mdui-card">
						<div className="mdui-card-media">
							{/*baike_info?<img src={baike_info.image_url}/>:""*/}
							<div className="mdui-card-primary">
								<div className="mdui-card-primary-title">
									{keyword}
								</div>
								<div className="mdui-card-primary-subtitle">
									相似度:{score}
								</div>
							</div>
							<div className="mdui-card-content">
								{baike_info.description
									? baike_info.description
									: "暂无介绍"}
							</div>
						</div>
					</div>

					<br></br>
				</>
			))}
		</>
	);
};

const AIC_TYPES = [
	{
		name: "通用物体和场景",
		value: "normal",
	},
	{
		name: "动物",
		value: "animal",
	},
	{
		name: "植物",
		value: "plant",
	},
	{
		name: "车型",
		value: "car",
	},
	{
		name: "菜品",
		value: "dish",
	},
];

type AICState = any;

class AIC extends React.Component<{}, AICState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			aic_type: 0,
			image: null,
			defaultImage: null,
			data: null,
			ifShow: false,
			ifShowCropper: false,
		};
	}
	loadDataFromServer() {
		const { image } = this.state;
		window.loadShow();
		axios
			.post("/api/aic", {
				image: image.split("base64,")[1],
			})
			.then((response) => {
				var json = JSON.parse(response.request.response);
				this.setState({
					data: json.result,
					ifShow: true,
				});
			})
			.catch((error) => {
				snackbar({ message: error });
			})
			.then(() => {
				window.loadHide();
			});
	}
	handleFileUpdate(file: any) {
		this.setState({
			ifShowCropper: true,
			image: file,
			defaultImage: file,
		});
	}
	render() {
		const {
			image,
			defaultImage,
			ifShow,
			data,
			aic_type,
			ifShowCropper,
		} = this.state;

		return (
			<>
				<div style={{ display: ifShowCropper ? "none" : "block" }}>
					<div className="mdui-shadow-0 mdui-card">
						<div className="mdui-card-content">
							{image && (
								<img
									style={{
										display: "block",
										margin: "0 auto",
										maxHeight: "200px",
									}}
									alt="预览"
									src={image}
								/>
							)}

							<ListControlMenu
								icon="language"
								title="识别类型"
								checked={aic_type}
								onCheckedChange={(checked) => {
									this.setState({ aic_type: checked });
								}}
								items={AIC_TYPES}
							/>
						</div>

						<div className="mdui-card-actions">
							<button
								onClick={() => {
									this.setState({
										ifShowCropper: true,
										image: defaultImage,
									});
								}}
								style={{
									display: image ? "inline-block" : "none",
								}}
								className="mdui-ripple mdui-btn"
							>
								重新裁剪
							</button>

							<FileInput
								fileType="image/*"
								readbydrag
								onFileUpload={(file, fileObj) => {
									console.log(fileObj);
									const cb = this.handleFileUpdate.bind(this);
									// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
									if (fileObj.size >= 1.4 * 1024 * 1024) {
										ImgCompress(file, 0.1, cb);
										//cb(file)
									} else {
										cb(file);
									}
								}}
							/>

							<button
								onClick={() => {
									image && this.loadDataFromServer();
								}}
								className="loadBtn mdui-btn-raised mdui-ripple mdui-color-theme mdui-btn"
							>
								<i className="mdui-icon mdui-icon-left material-icons">
									&#xe5ca;
								</i>
								识别
							</button>
						</div>
					</div>
				</div>

				<BottomAlert
					onClose={() => {
						this.setState({ ifShow: false });
					}}
					height={500}
					title="识别结果"
					ifShow={ifShow}
				>
					<Result result={data} />
				</BottomAlert>

				<Cropper
					ifShow={ifShowCropper}
					img={image}
					onClose={() => {
						this.setState({ ifShowCropper: false });
					}}
					onConfirm={(img: any) => {
						this.setState({ ifShowCropper: false, image: img });
					}}
				/>
			</>
		);
	}
}

export default AIC;
