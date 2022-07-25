import React from "react";
import QRCode from "qrcode";
import FileInput from "../../components/FileInput";
import { Theme, useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import { TabPanel, a11yProps } from "../../components/TabToolkits";

const create = (opts: any, text: any, callback: any, iconData: any) => {
	const loadImgae = (url) => {
		return new Promise((resolve) => {
			const image = new Image();
			image.addEventListener("load", () => {
				resolve(image);
			});
			image.src = url;
		});
	};

	const addIcon = (qrData, iconData) => {
		const qr = loadImgae(qrData);
		const icon = loadImgae(iconData);

		Promise.all([qr, icon]).then((arr) => {
			let icon = arr[1];
			let qr = arr[0];
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			canvas.height = qr.height;
			// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			canvas.width = qr.width;
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			ctx.drawImage(qr, 0, 0, qr.width, qr.height);
			// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			let iconSize = qr.width * 0.2;
			// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			let iconPos = qr.width / 2 - qr.width * 0.1;
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			ctx.drawImage(icon, iconPos, iconPos, iconSize, iconSize);
			callback(canvas.toDataURL());
		});
	};
	QRCode.toDataURL(text, opts, (err, url) => {
		if (err) throw err;
		if (iconData) {
			addIcon(url, iconData);
		} else {
			callback(url);
		}
	});
};

const Result = ({ qrcode }) => {
	if (!qrcode) return null;
	return (
		<Card>
			<img alt="qrcode" src={qrcode}></img>
		</Card>
	);
};

type QrcodeState = any;

class Qrcode extends React.Component<{}, QrcodeState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			text: "",
			wifi: {
				account: "",
				pwd: "",
			},
			mode: "normal",
			icon: null,
			colorLight: "#ffffff",
			colorDark: "#000000",
			width: "100",
			qrcode: null,
			currentTab: 0,
		};
	}
	handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
		this.setState({
			currentTab: newValue,
		});
	};
	handleClick = () => {
		const { text, colorDark, colorLight, mode, wifi, width, icon } =
			this.state;
		var opts = {
			errorCorrectionLevel: "H",
			type: "image/jpeg",
			quality: 0.3,
			margin: 1,
			width: width,
			color: {
				dark: colorDark,
				light: colorLight,
			},
		};
		const string =
			mode === 1
				? `WIFI:S:${wifi.account};P:${wifi.pwd};T:;H:;`
				: text === ""
				? "ygktool.cn"
				: text;
		const callback = (qrcode) => {
			this.setState({ qrcode: qrcode });
		};
		create(opts, string, callback, icon);
	};
	handleModeChange = (_e: any, value: string | number) => {
		this.setState({
			mode: value,
		});
	};
	render() {
		const {
			text,
			colorDark,
			colorLight,
			qrcode,
			mode,
			wifi,
			width,
			icon,
			currentTab,
		} = this.state;
		const Form =
			mode === "normal" ? (
				<FormControl fullWidth>
					<TextField
						onChange={(e) => {
							this.setState({ text: e.target.value });
						}}
						value={text}
						label="链接或文本"
						variant="outlined"
					/>
				</FormControl>
			) : (
				<>
					<FormControl fullWidth>
						<TextField
							onChange={(e) => {
								this.setState({
									wifi: {
										account: e.target.value,
										pwd: wifi.pwd,
									},
								});
							}}
							label="账号(SSID)"
							variant="outlined"
							value={wifi.account}
						/>
					</FormControl>
					<br />
					<br />
					<FormControl fullWidth>
						<TextField
							onChange={(e) => {
								this.setState({
									wifi: {
										account: e.target.value,
										pwd: wifi.pwd,
									},
								});
							}}
							label="密码"
							variant="outlined"
							value={wifi.pwd}
						/>
					</FormControl>
				</>
			);
		return (
			<>
				<Paper>
					<Tabs
						value={currentTab}
						onChange={this.handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						aria-label="options"
					>
						<Tab label="基本" {...a11yProps(0)} />
						<Tab label="高级" {...a11yProps(1)} />
					</Tabs>
					<TabPanel value={currentTab} index={0}>
						<FormControl fullWidth component="fieldset">
							<FormLabel component="legend">类型</FormLabel>
							<RadioGroup
								aria-label="type"
								name="类型"
								value={mode}
								onChange={this.handleModeChange}
							>
								<FormControlLabel
									value="normal"
									control={<Radio />}
									label="文本"
								/>
								<FormControlLabel
									value="wifi"
									control={<Radio />}
									label="WIFI"
								/>
							</RadioGroup>
						</FormControl>
						{Form}
						{/* 
						<RangeInput
							value={width}
							min="50"
							max="200"
							onValueChange={(newValue) => {
								this.setState({ width: newValue });
							}}
							title={"大小" + width + "px"}
						/> */}
					</TabPanel>
					<TabPanel value={currentTab} index={1}>
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<TextField
										onChange={(e) => {
											this.setState({
												colorLight: e.target.value,
											});
										}}
										value={colorLight}
										type="color"
										label="亮色"
									></TextField>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<TextField
										onChange={(e) => {
											this.setState({
												colorDark: e.target.value,
											});
										}}
										value={colorDark}
										type="color"
										label="暗色"
									></TextField>
								</FormControl>
							</Grid>
						</Grid>

						<br />

						<Typography variant="h6">图标</Typography>

						<FileInput
							fileType="image/*"
							// @ts-expect-error ts-migrate(2769) FIXME: Property 'file' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
							file={icon}
							handleFileUpload={(file) => {
								this.setState({
									icon: file,
								});
							}}
						/>
					</TabPanel>
				</Paper>

				<br></br>

				<Result qrcode={qrcode} />

				<Button onClick={this.handleClick} variant="outlined">
					生成
				</Button>
			</>
		);
	}
}

export default Qrcode;
