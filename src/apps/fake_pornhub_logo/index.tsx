import React from "react";
import html2canvas from "html2canvas";
import saveFile from "../../utils/fileSaver";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import SliderWithIcon from "../../components/SliderWithIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import BorderVerticalIcon from "@material-ui/icons/BorderVertical";
import ColorLensIcon from "@material-ui/icons/ColorLens";

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
	handleDownload = () => {
		// @ts-expect-error ts-migrate(2345) FIXME: Type 'null' is not assignable to type 'HTMLElement... Remove this comment to see the full error message
		html2canvas(document.querySelector("#blackborad")).then((canvas) => {
			let base64 = canvas.toDataURL("image/png");
			saveFile({
				file: base64,
				type: "png",
				filename: "ygktool-fake_pornhub_logo.png",
			});
		});
	};
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
				<List component={Paper}>
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
					<ListItem>
						<ListItemIcon>
							<BorderVerticalIcon />
						</ListItemIcon>
						<ListItemText primary="竖直排列" />
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								onChange={(e, statu) => {
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
								checked={front.color === "#000000"}
								inputProps={{
									"aria-labelledby": "竖直排列",
								}}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<ColorLensIcon />
						</ListItemIcon>
						<ListItemText primary="颜色反转" />
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								onChange={(e, checked) => {
									if (checked) {
										this.setState({
											front: {
												color: "#000000",
												backgroundColor:
													last.backgroundColor,
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
												backgroundColor:
													front.backgroundColor,
											},
										});
									}
								}}
								checked={front.color === "#000000"}
								inputProps={{
									"aria-labelledby": "颜色反转",
								}}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<Button
						onClick={this.handleDownload}
						color="primary"
						variant="contained"
					>
						下载
					</Button>
				</List>
			</>
		);
	}
}
