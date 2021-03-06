import React from "react";
import html2canvas from "html2canvas";
import saveFile from "../../utils/fileSaver";
import { RangeInput, ListControlCheck, Button } from "mdui-in-react";
import Slider from "@material-ui/core/Slider";
import SliderWithIcon from "../../components/SliderWithIcon";

const IfBr = ({ statu }: any) => {
	return statu === "vertical" ? <br></br> : null;
};

const FakeLogo = ({ hStyle, frontStyle, lastStyle }: any) => {
	return (
		<div
			style={{
				paddingTop: "50px",
				borderRadius: "4px",
				backgroundColor: "#000000",
				width: "90%",
				height: "200px",
				textAlign: "center",
			}}
			id="blackborad"
		>
			<h1
				style={{
					marginTop: "20px",
					fontFamily: "SimHei,STHeiti",
					fontWeight: 1000,
					letterSpacing: "-1.5px",
					fontSize: hStyle.size + "em",
				}}
				className="mdui-text-center"
			>
				<span
					style={{
						borderRadius: "4px",
						color: frontStyle.color,
						backgroundColor: frontStyle.backgroundColor,
					}}
					onInput={(e) => {
						/*props.onTextChange({
                        front:{
                            text:e.target.innerText,
                            backgroundColor:props.frontStyle.backgroundColor
                        }
                    })*/
					}}
					contentEditable={true}
				>
					Ygkt
				</span>
				<IfBr statu={hStyle.array} />
				<span
					style={{
						display: "inline",
						backgroundColor: lastStyle.backgroundColor,
						borderRadius: "4px",
						color: lastStyle.color,
						padding: "0px 4px 0px 4px",
						marginLeft: "3px",
					}}
					contentEditable={true}
				>
					ool
				</span>
			</h1>
		</div>
	);
};

type UiState = any;

export default class FakePornhubLogo extends React.Component<{}, UiState> {
	inputRef: any;
	constructor(props: {}) {
		super(props);
		this.state = {
			hStyle: {
				size: 4.0,
				array: "transverse",
			},
			front: {
				color: "#ffffff",
				backgroundColor: "transparent",
			},
			last: {
				color: "#000000",
				backgroundColor: "#f79817",
			},
		};
	}
	render() {
		const { hStyle, front, last } = this.state;
		return (
			<>
				<div className="center-with-flex">
					<FakeLogo
						hStyle={hStyle}
						frontStyle={front}
						lastStyle={last}
					/>
				</div>
				<SliderWithIcon title={"音量：" + hStyle.size}>
					<Slider
						value={hStyle.size}
						onChange={(_, value) => {
							this.setState({
								hStyle: {
									size: value,
									array: hStyle.array,
								},
							});
						}}
						aria-labelledby="continuous-slider"
						min={1}
						max={10}
					/>
				</SliderWithIcon>
				<ListControlCheck
					title="竖直排列"
					icon="border_vertical"
					checked={hStyle.array === "vertical"}
					onCheckedChange={(statu) => {
						if (statu) {
							this.setState({
								hStyle: {
									size: hStyle.size,
									array: "vertical",
								},
							});
						} else {
							this.setState({
								hStyle: {
									size: hStyle.size,
									array: "transverse",
								},
							});
						}
					}}
				/>
				<br></br>
				<ListControlCheck
					icon="color_lens"
					title="颜色反转"
					checked={front.color === "#000000"}
					onCheckedChange={(checked) => {
						if (checked) {
							this.setState({
								front: {
									color: "#000000",
									backgroundColor: last.backgroundColor,
								},
								last: {
									color: "#ffffff",
									backgroundColor: "transparent",
								},
							});
						} else {
							this.setState({
								front: {
									color: "#ffffff",
									backgroundColor: "transparent",
								},
								last: {
									color: "#000000",
									backgroundColor: front.backgroundColor,
								},
							});
						}
					}}
				/>
				<Button
					icon="file_download"
					title="下载"
					onClick={() => {
						// @ts-expect-error ts-migrate(2345) FIXME: Type 'null' is not assignable to type 'HTMLElement... Remove this comment to see the full error message
						html2canvas(document.querySelector("#blackborad")).then(
							(canvas) => {
								let base64 = canvas.toDataURL("image/png");
								saveFile({
									file: base64,
									type: "png",
									filename: "ygktool-fake_pornhub_logo.png",
								});
							}
						);
					}}
					primary
					raised
				/>
			</>
		);
	}
}
