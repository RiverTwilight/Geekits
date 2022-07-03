import React from "react";
import html2canvas from "html2canvas";
import saveFile from "../../src/utils/fileSaver";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import SliderWithIcon from "../../components/SliderWithIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import BorderVerticalIcon from "@mui/icons-material/BorderVertical";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import OutlinedCard from "../../components/OutlinedCard";

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
				maxWidth: "600px",
				height: "250px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
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
				<br />
				<OutlinedCard padding={1}>
					<List>
						<SliderWithIcon title={"字号：" + hStyle.size}>
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
									checked={hStyle.array === "vertical"}
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
													backgroundColor:
														"transparent",
												},
											});
										} else {
											this.setState({
												front: {
													color: "#ffffff",
													backgroundColor:
														"transparent",
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
				</OutlinedCard>
			</>
		);
	}
}
