import React from "react";
import { snackbar } from "mdui";
import axios from "../../utils/axios";
import ClipboardJS from "clipboard";
import { FileInput, ListControlCheck, ListControlMenu } from "mdui-in-react";
import Cropper from "../../utils/Cropper";
import ImgCompress from "../img_compress/engine";

const numMark = (text: any) => {
	var reg = /^1[3|4|5|7|8]\d{9}$/g;
	if (reg.test(text)) return text;
	var text = text.replace(
		reg,
		'<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>'
	);
	return text;
};

const emailMark = (text: any) => {
	var reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/g;
	if (reg.test(text)) return text;
	var text = text.replace(
		reg,
		'<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>'
	);
	return text;
};

const urlMark = (text: any) => {
	var reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/g;
	console.log(text + " is a url", reg.test(text));
	if (reg.test(text)) return text;
	var text = text.replace(
		reg,
		'<span data-clipboard-text="$&" class="copy mdui-text-color-theme">$&</span>'
	);
	return text;
};

const Result = ({ data, ifIgnoreLine, onIgnoreLine }: any) => {
	if (data === null) return null;
	const Tag = ifIgnoreLine ? "span" : "p";
	var markedText: any = [];
	var copiedText = "";
	data.words_result.map((line: any) => {
		markedText.push(emailMark(urlMark(line.words)));
		copiedText += line.words;
	});
	console.log(markedText);
	return (
		<>
			<div className="mdui-card">
				<div className="mdui-card-content">
					<ListControlCheck
						icon="keyboard_return"
						title="忽略换行"
						checked={ifIgnoreLine}
						onCheckedChange={(checked) => {
							onIgnoreLine(checked);
						}}
					/>
					{
						// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'line' implicitly has an 'any' type.
						markedText.map((line, i) => (
							<Tag
								key={i}
								dangerouslySetInnerHTML={{ __html: line }}
							></Tag>
						))
					}
				</div>

				<div className="mdui-card-actions">
					<button
						data-clipboard-text={copiedText}
						className="copy mdui-btn mdui-color-theme mdui-btn-raised"
					>
						复制
					</button>
				</div>
			</div>
		</>
	);
};

const language_types = [
	{
		name: "中英混合",
		value: "CHN_ENG",
	},
	{
		name: "英语",
		value: "ENG",
	},
	{
		name: "葡萄牙语",
		value: "POR",
	},
	{
		name: "法语",
		value: "FRE",
	},
	{
		name: "意大利语",
		value: "ITA",
	},
	{
		name: "德语",
		value: "GER",
	},
	{
		name: "西班牙语",
		value: "SPA",
	},
	{
		name: "俄语",
		value: "RUS",
	},
	{
		name: "日语",
		value: "JAP",
	},
	{
		name: "韩语",
		value: "KOR",
	},
];

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			language_type: 0,
			image: null,
			defaultImage: null,
			data: null,
			ifIgnoreLine: false,
			ifShowCropper: false,
		};
	}
	componentDidMount() {
		// @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
		clipboard && clipboard.destroy();
		var clipboard = new ClipboardJS(".copy");
		clipboard.on("success", (e) => {
			snackbar({ message: "已复制" });
			e.clearSelection();
		});
	}
	loadDataFromServer() {
		const { image, language_type } = this.state;
		window.loadShow();
		axios
			.post("/api/ocr", {
				image: image.split("base64,")[1],
				language_type: language_types[language_type].value,
			})
			.then((response) => {
				var json = JSON.parse(response.request.response);
				this.setState({ data: json, image: null });
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
			ifIgnoreLine,
			ifShowCropper,
			data,
			language_type,
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
									src={image}
								/>
							)}

							<ListControlMenu
								icon="language"
								title="语言"
								checked={language_type}
								onCheckedChange={(checked) => {
									this.setState({ language_type: checked });
								}}
								items={language_types}
							/>
						</div>

						<div className="mdui-card-actions">
							<button
								style={{
									display: image ? "inline-block" : "none",
								}}
								onClick={() => {
									this.setState({
										ifShowCropper: true,
										image: defaultImage,
									});
								}}
								className="mdui-ripple mdui-btn"
							>
								重新裁剪
							</button>

							<FileInput
								readbydrag
								fileType="image/*"
								onFileUpload={(file, fileObj) => {
									const cb = this.handleFileUpdate.bind(this);
									// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
									if (fileObj.size >= 1.4 * 1024 * 1024) {
										// @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
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
					<br></br>
					<Result
						onIgnoreLine={(newCheck: any) => {
							this.setState({ ifIgnoreLine: newCheck });
						}}
						ifIgnoreLine={ifIgnoreLine}
						data={data}
					/>
				</div>

				<Cropper
					ifShow={ifShowCropper}
					img={image}
					onClose={() => {
						this.setState({ ifShowCropper: false });
					}}
					onConfirm={(img: any) => {
						this.setState({ ifShowCropper: false, image: img });
					}}
					title=""
				/>
			</>
		);
	}
}
